import { Node, fragment } from "./node"

class Parser {
	index: number
	template: string
	stack: Node[]
	root: Node

	constructor(template: string) {
		this.index = 0
		this.template = template.trim()
		this.stack = []

		this.root = {
			start: null,
			end: null,
			name: 'root',
			type: 'Fragment',
			children: []
		}

		this.stack.push(this.root)

		while(this.index < this.template.length) {
			fragment(this)
		}
	}

	match(pattern: string) {
		if (this.template.slice(this.index, this.index + pattern.length) === pattern) return true

		return false
	}

	current() {
		return this.stack[this.stack.length - 1]
	}

	read(pattern: string) {
		if (this.template.slice(this.index, this.index + pattern.length) === pattern) {
			this.index += pattern.length
			return true
		}

		return false
	}

	read_until(pattern: RegExp) {
		const match = this.template.slice(this.index).match(pattern)

		const start = this.index

		if (!match) {
			this.index = this.template.length
			return this.template.slice(this.index)
		}

		this.index = start + match.index
		return this.template.slice(start, this.index)
	}
}

function parse(str: string) {
	const parser = new Parser(str)

	return parser.root
}

export {
	Parser,
	parse
}
