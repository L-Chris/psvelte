import { TemplateNode } from "./node";

class Generator {
	code: string
	ast: TemplateNode

	constructor(ast: TemplateNode) {
		this.ast = ast
		this.code = this.transform(ast)
	}

	transform(ast: TemplateNode) {
		let statement = ast.children.reduce((pre, val) => {
			let template = val.type === 'Element' ? `element('${val.name}')` : `text('${val.content}')`;

			return `${pre}${template};`
		}, '')

		let code = `
import {
	append,
	element
} from 'psvelte'

function render(target) {
	var root = ${statement}
	append(target, root);
}

export default render
`

		return code
	}
}

function generate(ast: TemplateNode) {
	const generator = new Generator(ast)
	return generator.code
}

export {
	generate
}
