import { Attribute, TemplateNode } from './interfaces'
import { Parser } from './parser'

function fragment(parser: Parser) {
	if (parser.match('<')) return tag(parser)
	return text(parser)
}

function tag(parser: Parser) {
	const start = parser.index++

	const parent = parser.current()

	const is_closing_tag = parser.read('/')

	const name = parser.read_until(/[\s\/>]/)

	parser.allow_whitespace()

	if (is_closing_tag && parent.name === name) {
		parser.read('>')
		parent.end = parser.index
		parser.stack.pop()

		return
	}

	const element: TemplateNode = {
		start,
		end: null,
		type: 'Element',
		name,
		attributes: [],
		children: []
	}

	// attribute
	let attribute: Attribute

	while(attribute = read_attribute(parser)) {
		element.attributes.push(attribute)
		parser.allow_whitespace()
	}

	// style
	if (name === 'style') {
		parser.read('>')

		const content = parser.read_until(/<\/style>/)
		parser.read('</style>')

		element.content = content

		parser.css.push(element)

		return
	}

	parent.children.push(element)
	parser.stack.push(element)

	parser.read('>')
}

function text(parser: Parser) {
	const parent = parser.current()

	const element: TemplateNode = {
		start: parser.index,
		end: null,
		type: 'Text',
		name: 'text',
		content: ''
	}

	const content = parser.read_until(/</)

	element.content = content
	element.end = parser.index

	parent.children.push(element)
}

function read_attribute(parser: Parser): Attribute {
	const start = parser.index

	const name = parser.read_until(/[\s=>]/)

	if (!name) return null

	let value: any = true

	if (parser.read('=')) {
		const mark = parser.read("'") ? "'" : parser.read('"') ? '"' : null

		value = parser.read_until(new RegExp(mark))

		if (mark) {
			parser.index++
		}
	}

	let end = parser.index

	return {
		start,
		end,
		type: 'Attribute',
		name,
		value
	}
}

export {
	fragment
}
