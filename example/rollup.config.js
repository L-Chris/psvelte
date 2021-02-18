import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import psvelte from './rollup-plugin-psvelte'

export default {
	input: './main.js',
	output: {
		sourcemap: false,
		format: 'iife',
		name: 'app',
		file: './dist/bundle.js'
	},
	plugins: [
		psvelte(),
		resolve({
			browser: true
		}),
		commonjs(),
		serve(),
		livereload('.'),
	],
	watch: {
		clearScreen: false
	}
}
