import { z } from 'zod';
import { AuthGuard } from '@nestjs/passport';
import { IRequestBody } from '@/utils/request-utils';
import { UserPayload } from '@/infra/auth/sources/jwt.strategy';
import { PropertyStatus } from '@/entities/enums/property-status';
import { ResidentialType } from '@/entities/enums/residential-type';
import { CreateApartmentUseCase } from '@/use-cases/create-apartment';
import { CurrentUser } from '@/infra/auth/sources/current-user.decorator';
import { Body, Controller, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateZipCodeInfoInterceptor } from '../interceptors/create-zip-code-info-interceptor';

@Controller('/create-apartment')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(CreateZipCodeInfoInterceptor)
export class CreateApartmentController {
	constructor(private createApartment: CreateApartmentUseCase) {}

    @Post()
	async handle(@Body() body: CreateApartmentBodySchema, @Request() request: IRequestBody, @CurrentUser() user: UserPayload) {
		const { addressNumber, addressComplement, airConditioner, amenities, areaSize, balcony, bathrooms, bedrooms, builtYear, condominium, condominiumTax, description,
			dinnerRoom, elevator, floors, furniture, garage, gym, heat, imagesIds, kitchen, laundry, livingRoom, playground, pool, price, socialSpace, sponsorId, status
		} = createApartmentBodySchema.parse(body);

		const ownerId = user.sub;
		
		const { zipCodeInfo } = request;

		await this.createApartment.handle({
			zipCodeInfo,
			addressNumber,
			addressComplement,
			amenities,
			areaSize,
			builtYear,
			description,
			imagesIds,
			ownerId,
			price,
			sponsorId,
			status,
			type: ResidentialType.APARTMENT,
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

const createApartmentBodySchema = z.object({
	addressNumber: z.string(),
	addressComplement: z.string().optional(),
	amenities: z.coerce.number(),
	areaSize: z.coerce.number(),
	builtYear: z.coerce.number(),
	price: z.coerce.number(),
	condominium: z.string().optional(),
	condominiumTax: z.coerce.number().optional(),
	description: z.string(),
	imagesIds: z.array(z.string()),
	sponsorId: z.string(),
	status: z.enum([PropertyStatus.FOR_BUY, PropertyStatus.FOR_RENT]),
	playground: z.boolean().optional(),
	furniture: z.boolean().optional(),
	gym: z.boolean().optional(),
	socialSpace: z.boolean().optional(),
	airConditioner: z.coerce.number().optional(),
	balcony: z.coerce.number().optional(),
	bathrooms: z.coerce.number().optional(),
	bedrooms: z.coerce.number().optional(),
	dinnerRoom: z.coerce.number().optional(),
	elevator: z.coerce.number().optional(),
	floors: z.coerce.number().optional(),
	garage: z.coerce.number().optional(),
	heat: z.coerce.number().optional(),
	kitchen: z.coerce.number().optional(),
	laundry: z.coerce.number().optional(),
	livingRoom: z.coerce.number().optional(),
	pool: z.coerce.number().optional()
});

type CreateApartmentBodySchema = z.infer<typeof createApartmentBodySchema>