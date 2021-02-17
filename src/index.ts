import { parse } from './parser'
import { generate } from './generator'

function compile(template: string) {
	const ast = parse(template)
	const code = generate(ast)

	return code
}

export {
	compile
}
