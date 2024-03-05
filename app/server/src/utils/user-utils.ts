import { z } from 'zod';

export const createUserBodySchema = z.object({
	name: z.string(),
	telephone: z.string().refine(tel => {
		const regex = /^\(\d{2}\) \d{4}-\d{4}$/;
		return regex.test(tel);
	}, {
		message: 'Invalid telephone number format. Expected format: (dd) dddd-dddd'
	}).optional(),
	cellphone: z.string().refine(phone => {
		const regex = /^\(\d{2}\) \d{3}-\d{3}-\d{3}$/;
		return regex.test(phone);
	}, {
		message: 'Invalid phone number format. Expected format: (dd) ddd-ddd-ddd'
	}),
	email: z.string().email(),
	password: z.string().refine(password => password.length >= 8, 'The password needs to have at least 8 characters.')
});

export type CreateUserBodySchema = z.infer<typeof createUserBodySchema>