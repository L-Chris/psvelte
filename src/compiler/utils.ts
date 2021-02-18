import { BaseNode, walk } from 'estree-walker'

const flatten = <T extends BaseNode>(ast: T): T[] => {
	const result = []

	walk(ast, {
		enter(node, parent) {
			if (!parent || ['Fragment', 'Attribute'].includes(node.type)) return

			result.push(node)
		}
	})

	return result
}

export {
	flatten
}
