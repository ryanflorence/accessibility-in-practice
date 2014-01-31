// this file is designed to freak you out
const fs = require('fs')
const path = require('path')
const hbs = require('handlebars')
const cheerio = require('cheerio')

!function main() {
  return process.stdout.write(
    template()(
      templateLocals()))}()

function filesPath() {
  return path.resolve('demos')}

function filePath(file) {
  return ''+filesPath()+'/'+file}

function makeFileObject(fileName) {
  return {
    id: fileName.replace(/\.html$/, ''),
    content: fs.readFileSync(
      filePath(fileName)).toString()}}

function files() {
  return fs.readdirSync(
    filesPath())}

function processFile(fileName) {
  return parseFile(
    makeFileObject(fileName))}

function templatePath() {
  return path.join(__dirname, 'template.hbs')}

function template() {
  return hbs.compile(
    fs.readFileSync(
      templatePath()).toString())}

function parseFile(fileObject) {
  return templateFileObject(
    fileObject.id, cheerio.load(
      fileObject.content))}

function templateFileObject(id, $) {
  return {
      name: $('title').html(),
      id: id,
      introduction: $('introduction').html(),
      textIntroduction: $('introduction').text().trim().replace(/\s+/g, ' '),
      incorrect: getDemos($, 'incorrect'),
      correct: getDemos($, 'correct')}}

function getDemos($, kind) {
  return $(kind).find('demo').map(function(i, el) {
    return {
      code: cleanWhitespace($(el).find('code').html()),
      discussion: $(el).find('discussion').html()}}).toArray()}

function cleanWhitespace(html) {
  return html}

function readCss() {
  return fs.readFileSync(
    path.resolve(__dirname, 'styles.css')).toString()}

function notDraft(fileName) {
  return !fileName.match(/draft.html$/)}

function templateLocals() {
  return {
    files: files().filter(notDraft).sort().map(processFile),
    css: readCss()}}

