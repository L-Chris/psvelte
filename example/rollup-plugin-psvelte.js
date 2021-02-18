const path = require('path')

const { createFilter } = require('@rollup/pluginutils')
const { compile } = require('../dist/compiler')

export default function (options = {}) {
	const extensions = options.extensions || ['.svelte']
	const filter = createFilter(options.include)

	return {
		name: 'psvelte',
		async transform(code, id) {
			if (!filter(id)) return null

			const extension = path.extname(id);
			if (!~extensions.indexOf(extension)) return null;

			const compiled = compile(code);

			return {
				code: compiled,
				map: { mappings: '' }
			}
		}
	}
}
