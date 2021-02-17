
const append = (target, node) => target.appendChild(node)
const element = (tag) => document.createElement(tag)
const text = (content) => document.createTextNode(content)

function render(target) {
	var root = element('div');
	append(target, root);
}

window.render = render
