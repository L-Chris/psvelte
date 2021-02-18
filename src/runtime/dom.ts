export const append = (target: Node, node: Node) => target.appendChild(node)

export const insert = (target: Node, node: Node) => target.insertBefore(node, null)

export const detach = (node: Node) => node.parentNode.removeChild(node)

export const element = (tagName: string) => document.createElement(tagName)

export const text = (data: string) => document.createTextNode(data)
