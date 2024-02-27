import swc from 'unplugin-swc';
import tsconfigPaths from 'vite-tsconfig-paths'; // this library helps the vitest to understand the @/* paths

import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		globals: true,
		root: './'
	},
	plugins: [
		tsconfigPaths(),
		swc.vite({
			module: { type: 'es6' }
		})
	]
});