interface Node {
	start: number;
	end: number;
	type: string;
	children?: Node[];
}

class Parser {
	index: number
	template: string
	stack: Node[]
	root: Node

	constructor(template: string) {
		this.index = 0
		this.template = template.trim()

		this.root = {
			start: null,
			end: null,
			type: 'Fragment',
			children: []
		}

		while(this.index < this.template.length) {
			if (!this.read('<')) {
				throw new Error('error')
			} else {
				const name = this.read_until('>')

				console.log('name', name)
			}
		}
	}

	read(pattern: string) {
		if (this.template.slice(this.index, this.index + pattern.length) === pattern) {
			this.index += pattern.length
			return true
		}

		return false
	}

	read_until(pattern: string) {
		const match = this.template.slice(this.index).match(pattern)

		if (!match) {
			this.template.slice(this.index)
		}

		const start = this.index
		this.index = start + match.index

		return this.template.slice(start, this.index)
	}
}

function parse(str: string) {
	new Parser(str)
}

export {
	parse
}
