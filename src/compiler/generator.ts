import { FragmentNode, TemplateNode } from "./node";
import { walk } from 'estree-walker'

class Generator {
	code: string
	ast: TemplateNode
	fragment: FragmentNode
	idMap: Map<string, number>

	constructor(ast: TemplateNode) {
		this.ast = ast
		this.idMap = new Map()
		this.fragment = this.transform()
		this.code = this.generate()
	}

	transform() {
		const generator = this
		const data = JSON.parse(JSON.stringify(this.ast))

		walk(data, {
			enter(node: any, parent: any) {
				const newNode = {
					...node,
					id: generator.get_unique_name(node.name || node.type),
					parentId: parent && parent.id,
					parentType: parent && parent.type
				}

				this.replace(newNode)
			},
		})

		return data
	}

	generate() {
		let statement = this.fragment.children.reduce((pre, val) => {
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

	get_unique_name(type) {
		if (type === 'root') return type

		const key = this.idMap.has(type) ? this.idMap.get(type) + 1 : 0

		this.idMap.set(type, key)

		return `${type}${key}`
	}
}

function generate(ast: TemplateNode) {
	const generator = new Generator(ast)
	return generator.code
}

export {
	generate
}
