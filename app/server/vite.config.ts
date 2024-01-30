// this library helps the vitest to understand the @/* paths
import tsconfigPaths from 'vite-tsconfig-paths';

import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [tsconfigPaths()]
});