import { UserPayload } from './jwt.strategy';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

/**
 * Param Decorator that returns the user's accessToken from the HTTP request.
 */
export const CurrentUser = createParamDecorator((_: never, context: ExecutionContext) => {
	const request = context.switchToHttp().getRequest();

	return request.user as UserPayload;
});