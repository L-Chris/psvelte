import { ParserAST } from './parser'
import { FragmentNode } from "./node";
import { walk } from 'estree-walker'
import { flatten } from "./utils";

class Generator {
	ast: ParserAST;
	code: string
	fragment: FragmentNode
	idMap: Map<string, number>

	constructor(ast: ParserAST) {
		this.ast = ast
		this.idMap = new Map()
		this.fragment = this.transform()
		this.code = this.generate()
	}

	transform() {
		const generator = this
		const data = JSON.parse(JSON.stringify(this.ast.html))

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
		const arr = flatten(this.fragment)

		const createStatements = []
		const insertStatements = []

		arr.forEach(val => {
			const createBlock = `const ${val.id} = ${val.type === 'Element' ? `element('${val.name}')` : `text('${val.content}')`}`

			createStatements.push(createBlock)

			if (val.parentId) {
				const insertBlock = val.name === 'root'
					? `insert(this.target, ${val.id})`
					: `insert(${val.parentId}, ${val.id})`

				insertStatements.push(insertBlock)
			}
		})

		this.ast.css.forEach(val => {
			const id = this.get_unique_name(val.name || val.type)

			const createBlock = `const ${id} = styleElement('${val.content}')`
			const insertBlock = `insert(this.target, ${id})`

			createStatements.push(createBlock)
			insertStatements.push(insertBlock)
		})

		let code =
`import {
	SvelteComponent,
	element,
	styleElement,
	text,
	append,
	insert,
} from 'psvelte'

class App extends SvelteComponent {
	constructor(target) {
		super(target)
	}

	createFragment() {
		${createStatements.join('\n		')}
		${insertStatements.join('\n		')}
	}
}

export default App
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

function generate(ast: ParserAST) {
	const generator = new Generator(ast)

	return generator.code
}

export {
	generate
}
