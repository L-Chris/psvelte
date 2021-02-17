import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import sucrase from '@rollup/plugin-sucrase';

export default [
	// runtime
	{
		input: 'src/runtime/index.ts',
		output: [
			{
				name: `index`,
				file: 'dist/index.js',
				format: 'cjs',
				sourcemap: true
			}
		],
		plugins: [
			sucrase({
				transforms: ['typescript']
			})
		]
	},
	// compiler
	{
		input: 'src/compiler/index.ts',
		output: [
			{
				file: 'dist/compiler.js',
				format: 'cjs',
				name: 'svelte',
				sourcemap: true
			}
		],
		plugins: [
			resolve(),
			commonjs({
				include: ['node_modules/**']
			}),
			json(),
			sucrase({
				transforms: ['typescript']
			})
		]
	}
]
