import { Node } from "./node";

class Generator {
	code: string
	ast: Node

	constructor(ast: Node) {
		this.ast = ast
		this.code = this.transform(ast)
	}

	transform(ast: Node) {
		let statement = ast.children.reduce((pre, val) => {
			let template = val.type === 'Element' ? `element('${val.name}')` : `text('${val.content}')`;

			return `${pre}${template};`
		}, '')

		let code = `
const append = (target, node) => target.appendChild(node)
const element = (tag) => document.createElement(tag)
const text = (content) => document.createTextNode(content)

function render(target) {
	var root = ${statement}
	append(target, root);
}

window.render = render
`

		return code
	}
}

function generate(ast: Node) {
	const generator = new Generator(ast)
	return generator.code
}

export {
	generate
}
