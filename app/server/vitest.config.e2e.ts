import swc from 'unplugin-swc';
import tsConfigPaths from 'vite-tsconfig-paths'; // this library helps the vitest to understand the @/* paths

import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		include: ['**/*.e2e-spec.ts'],
		globals: true,
		root: './',
		setupFiles: ['./test/infra/setup-e2e.ts']
	},
	plugins: [
		tsConfigPaths(),
		swc.vite({
			module: { type: 'es6' }
		})
	]
});