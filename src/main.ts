import { compile } from './'

const fs = require('fs')

const template = fs.readFileSync('./test/example.svelte', { encoding: 'utf-8' })

const result = compile(template)

fs.writeFileSync('./test/example.js', result)

