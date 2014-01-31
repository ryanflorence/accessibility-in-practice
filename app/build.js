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
      resources: getResources($),
      textIntroduction: $('introduction').text().trim().replace(/\s+/g, ' '),
      incorrect: getDemos($, 'incorrect', id),
      correct: getDemos($, 'correct', id)}}

function getResources($) {
  return $('resources resource').map(function(i, resource) {
    return (function(el) {
      return {
        href: el.attr('href'),
        title: el.attr('title'),
        description: el.html() }})($(resource))}).toArray()}

function getDemos($, kind, id) {
  return $(kind).find('demo').map(function(i, el) {
    return {
      id: id+'-'+kind+'-'+(i+1),
      code: getCode($(el)),
      height: $(el).find('code').attr('height'),
      iframeSrc: getIframeSource($(el)),
      discussion: $(el).find('discussion').html()}}).toArray()}

function getCode($el) {
  return cleanWhitespace($el.find('code').html())}

function getIframeSource($el) {
  return "data:text/html;charset=utf-8,"+
          encodeURIComponent(
            '<style>body{margin:0;font-family:"helvetica neue",helvetica,sans-serif;font-weight:200;}</style>\n'+
            '<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>\n'+
            getCode($el))}

function getInitialIndent(html, fn) {
  return html.match(/[^\s]/).index}

function cleanWhitespace(html) {
  return trimLeadingWhitespace(html, getInitialIndent(html))}

function trimLeadingWhitespace(string, indent) {
  return trimEmptyFirstLines(string.split('\n')).map(function(line) {
    return line.substring(indent - 1)}).join('\n')}

function trimEmptyFirstLines(lines) {
  var foundNonEmptyLine = false; // nooooooo but how do I get rid of this var?
  return lines.filter(function(line) {
    return foundNonEmptyLine || (foundNonEmptyLine = line.trim() !== '')})}

function readCss() {
  return fs.readFileSync(
    path.resolve(__dirname, 'styles.css')).toString()}

function notDraft(fileName) {
  return !fileName.match(/draft.html$/)}

function templateLocals() {
  return {
    files: files().filter(notDraft).sort().map(processFile),
    css: readCss()}}

