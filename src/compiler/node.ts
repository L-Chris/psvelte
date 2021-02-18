import { Parser } from './parser'

interface TemplateNode {
	start: number;
	end: number;
	name?: string;
	type: string;
	content?: string;
	children?: TemplateNode[];
}

interface FragmentNode extends TemplateNode {
	id?: string;
	parentId: string;
	parentType: string;
}

interface TextTemplateNode extends TemplateNode {
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

	const element: TextTemplateNode = {
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

export {
	TemplateNode,
	TextTemplateNode,
	FragmentNode,
	fragment
}
