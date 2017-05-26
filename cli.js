#!/usr/bin/env node
'use strict';
var fs = require('fs');
var meow = require('meow');
var linkReplacer = require('./index.js');

var cli = meow({
  help: [
    'Usage',
    '  $ is-an-image-url "<url>"',
    '',
    'Example',
    '  $ is-an-image-url "https://www.npmjs.com/static/images/collaboration-security.svg"'
  ]
});

if (cli && cli.flags && cli.flags.h) {
  return;
}

var templateString = cli.flags.t;
var filePath = cli.flags.i;

function replaceLinksCallback(newMarkdown) {
  console.log(newMarkdown);
}

function executeLinkReplace(markdown, template) {
  linkReplacer.replacePlainLinks(markdown, replaceLinksCallback, template);
}

function afterFileReadExecuteLinkReplace(secondInputErr, fileText) {
  executeLinkReplace(fileText, templateString);
}

if (filePath) {
  fs.readFile(filePath, 'utf8', afterFileReadExecuteLinkReplace);
} else {
  executeLinkReplace(cli.input[0], templateString);
}
