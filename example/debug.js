const fs = require('fs')
const { compile } = require('../dist/compiler')

const rawData = fs.readFileSync('./example/app.svelte', 'utf-8')

const result = compile(rawData)

console.log(result)
