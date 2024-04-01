import { z } from 'zod';
import { AuthGuard } from '@nestjs/passport';
import { IRequestBody } from '@/utils/request-utils';
import { CreateStudioUseCase } from '@/use-cases/create-studio';
import { UserPayload } from '@/infra/auth/sources/jwt.strategy';
import { PropertyStatus } from '@/entities/enums/property-status';
import { ResidentialType } from '@/entities/enums/residential-type';
import { CurrentUser } from '@/infra/auth/sources/current-user.decorator';
import { Body, Controller, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateZipCodeInfoInterceptor } from '../interceptors/create-zip-code-info-interceptor';

@Controller('/create-studio')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(CreateZipCodeInfoInterceptor)
export class CreateStudioController {
	constructor(private createStudio: CreateStudioUseCase) {}

    @Post()
	async handle(@Body() body: CreateStudioBodySchema, @Request() request: IRequestBody, @CurrentUser() user: UserPayload) {
		const { addressComplement, addressNumber, airConditioner, amenities, areaSize, balcony, bathrooms, bedrooms, builtYear,
			condominium, condominiumTax, description, dinnerRoom, elevator, floors, furniture, garage, gym, heat, imagesIds, kitchen,
			laundry, livingRoom, playground, pool, price, socialSpace, sponsorId, status
		} = createStudioBodySchema.parse(body);

		const ownerId = user.sub;

		const { zipCodeInfo } = request;

		await this.createStudio.handle({
			zipCodeInfo,
			addressComplement,
			addressNumber,
			amenities,
			areaSize,
			builtYear,
			description,
			imagesIds,
			ownerId,
			price,
			sponsorId,
			status,
			type: ResidentialType.STUDIO,
			airConditioner,
			balcony,
			bathrooms,
			bedrooms,
			condominium,
			condominiumTax,
			dinnerRoom,
			elevator,
			floors,
			furniture,
			garage,
			gym,
			heat,
			kitchen,
			laundry,
			livingRoom,
			playground,
			pool,
			socialSpace    
		});
	}
}

const createStudioBodySchema = z.object({
	addressNumber: z.string(),
	addressComplement: z.string().optional(),
	description: z.string(),
	status: z.enum([PropertyStatus.FOR_BUY, PropertyStatus.FOR_RENT]),
	price: z.coerce.number(),
	areaSize: z.coerce.number(),
	floors: z.coerce.number().optional(),
	builtYear: z.coerce.number(),
	imagesIds: z.array(z.string()),
	sponsorId: z.string(),
	condominium: z.string().optional(),
	condominiumTax: z.coerce.number().optional(),
	amenities: z.coerce.number(),
	pool: z.coerce.number().optional(),
	heat: z.coerce.number().optional(),
	airConditioner: z.coerce.number().optional(),
	balcony: z.coerce.number().optional(),
	laundry: z.coerce.number().optional(),
	garage: z.coerce.number().optional(),
	elevator: z.coerce.number().optional(),
	bedrooms: z.coerce.number().optional(),
	bathrooms: z.coerce.number().optional(),
	kitchen: z.coerce.number().optional(),
	livingRoom: z.coerce.number().optional(),
	dinnerRoom: z.coerce.number().optional(),
	playground: z.boolean().optional(),
	gym: z.boolean().optional(),
	socialSpace: z.boolean().optional(),
	furniture: z.boolean().optional()
});

type CreateStudioBodySchema = z.infer<typeof createStudioBodySchema>