// this file is designed to freak you out
const fs = require('fs')
const path = require('path')
const hbs = require('handlebars')
const cheerio = require('cheerio');

(function main() {
  return process.stdout.write(
    template()(
      templateLocals()))})()

function defaultFilesPath() {
  return 'demos'}

function filesPath() {
  return path.resolve(
    defaultFilesPath())}

function filePath(file) {
  return ''+filesPath()+'/'+file}

function readFile(file) {
  return {
    id: file.replace(/\.html$/, ''),
    content: fs.readFileSync(
      filePath(file)).toString()
    }}

function files() {
  return fs.readdirSync(
    filesPath())}

function processFile(file) {
  return parseFile(
    readFile(file))}

function templatePath() {
  return path.join(__dirname, 'template.hbs')}

function template() {
  return hbs.compile(
    fs.readFileSync(
      templatePath()).toString())}

function parseFile(fileObject) {
  return (function($) {
    return {
      name: $('title').html(),
      id: fileObject.id,
      introduction: $('introduction').html(),
      textIntroduction: $('introduction').text().trim().replace(/\s+/g, ' '),
      incorrect: {
        description: $('incorrect description').html(),
        demo: $('incorrect demo').html().trim(),
      },
      correct: {
        description: $('correct description').html(),
        demo: $('correct demo').html().trim(),
      },
    }})(cheerio.load(fileObject.content))}

function css() {
  return fs.readFileSync(
    path.resolve(__dirname, 'styles.css')).toString()}

function templateLocals() {
  return {
    files: files().sort().map(processFile),
    css: css() }}

