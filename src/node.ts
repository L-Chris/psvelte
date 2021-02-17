import { Parser } from './parser'

interface Node {
	start: number;
	end: number;
	name?: string;
	type: string;
	children?: Node[];
}

interface TextNode extends Node {
	content: string;
}

function fragment(parser: Parser) {
	if (parser.match('<')) return tag(parser)
	return text(parser)
}

function tag(parser: Parser) {
	parser.index++

	const parent = parser.current()

	const is_closing_tag = parser.read('/')

	const name = parser.read_until(/>/)

	parser.read('>')

	if (is_closing_tag && parent.name === name) {
		parent.end = parser.index
		parser.stack.pop()
	} else {
		const element = {
			start: parser.index,
			end: null,
			type: 'Element',
			name,
			children: []
		}

		parent.children.push(element)
		parser.stack.push(element)
	}
}

function text(parser: Parser) {
	const parent = parser.current()

	const element: TextNode = {
		start: parser.index,
		end: null,
		type: 'Text',
		content: ''
	}

	const content = parser.read_until(/</)

	element.content = content
	element.end = parser.index

	parent.children.push(element)
}

export {
	Node,
	TextNode,
	fragment
}
