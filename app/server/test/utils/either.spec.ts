import { test, expect } from 'vitest';
import { Either, left, right } from '@/utils/either';

function check(success: boolean): Either<string, number> {
	if (success) {
		return right(10);
	} else {
		return left('error');
	}
}

test('success result', () => {
	const result = check(true);

	expect(result.isRight()).toBe(true);
	expect(result.isLeft()).toBe(false);
});

test('error result', () => {
	const result = check(false);

	expect(result.isLeft()).toBe(true);
	expect(result.isRight()).toBe(false);
});