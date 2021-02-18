import { TemplateNode, StyleTemplateNode, fragment } from "./node"

interface ParserAST {
	html: TemplateNode
	css: StyleTemplateNode[]
}

class Parser {
	index: number
	template: string
	stack: TemplateNode[]
	html: TemplateNode
	css: StyleTemplateNode[]

	constructor(template: string) {
		this.index = 0
		this.template = template.trim().replace(/\s/g, '')
		this.stack = []
		this.css = []

		this.html = {
			start: null,
			end: null,
			name: 'root',
			type: 'Fragment',
			children: []
		}

		this.stack.push(this.html)

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

function parse(str: string): ParserAST {
	const parser = new Parser(str)

	return {
		html: parser.html,
		css: parser.css
	}
}

export {
	ParserAST,
	Parser,
	parse
}
