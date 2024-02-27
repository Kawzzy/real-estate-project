import { config } from 'dotenv';
import { randomUUID } from 'node:crypto';
import { envSchema } from '@/infra/env/env';
import { execSync } from 'node:child_process';
import { PrismaClient } from '@prisma/client';

config({ path: '.env', override: true });
config({ path: '.env.test', override: true });

const env = envSchema.parse(process.env);

const prismaConnection = new PrismaClient();

function generateUniqueDatabaseURL(schemaId: string) {
	if (!env.DATABASE_URL) {
		throw new Error('Please provide a DATABASE_URL environment variable.');
	}

	const url = new URL(env.DATABASE_URL);

	url.searchParams.set('schema', schemaId);

	return url.toString();
}

const schemaId = randomUUID();

beforeAll(() => {
	const databaseUrl = generateUniqueDatabaseURL(schemaId);

	env.DATABASE_URL = databaseUrl;

	execSync('npx prisma migrate deploy');
});

afterAll(async () => {
	await prismaConnection.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`);
	await prismaConnection.$disconnect();
});