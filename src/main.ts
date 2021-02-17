import { parse } from './parser'

const fs = require('fs')

const data = fs.readFileSync('./test/example.svelte', { encoding: 'utf-8' })

const result = parse(data)

console.log(result)

