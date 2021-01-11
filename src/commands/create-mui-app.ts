#!/usr/bin/env node
import init from '../libs/init'
const program = require('commander')
program.version(require('../package').version)
program
    .command('init <name>')
    .description('create mui project')
    .action(init)
program.parse(process.argv)