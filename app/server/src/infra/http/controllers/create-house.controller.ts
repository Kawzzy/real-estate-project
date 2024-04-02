import { z } from 'zod';
import { AuthGuard } from '@nestjs/passport';
import { IRequestBody } from '@/utils/request-utils';
import { CreateHouseUseCase } from '@/use-cases/create-house';
import { UserPayload } from '@/infra/auth/sources/jwt.strategy';
import { PropertyStatus } from '@/entities/enums/property-status';
import { ResidentialType } from '@/entities/enums/residential-type';
import { CurrentUser } from '@/infra/auth/sources/current-user.decorator';
import { Body, Controller, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateZipCodeInfoInterceptor } from '../interceptors/create-zip-code-info-interceptor';

@Controller('/create-house')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(CreateZipCodeInfoInterceptor)
export class CreateHouseController {
	constructor(private createHouse: CreateHouseUseCase) {}

    @Post()
	async handle(@Body() body: CreateHouseBodySchema, @Request() request: IRequestBody, @CurrentUser() user: UserPayload) {
		const { addressComplement, addressNumber, airConditioner, amenities, areaSize, backyard, balcony, bathrooms, bedrooms, builtYear,
			condominium, condominiumTax, deck, description, dinnerRoom, driveWay, elevator, floors, frontYard, furniture, garage, gym, heat,
			imagesIds, kitchen, laundry, livingRoom, playground, pool, porch, price, socialSpace, sponsorId, status
		} = createHouseBodySchema.parse(body);

		const ownerId = user.sub;

		const { zipCodeInfo } = request;

		await this.createHouse.handle({
			zipCodeInfo,
			addressComplement,
			addressNumber,
			amenities,
			areaSize,
			backyard,
			builtYear,
			deck,
			description,
			driveWay,
			frontYard,
			imagesIds,
			ownerId,
			porch,
			price,
			sponsorId,
			status,
			type: ResidentialType.HOUSE,
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

const createHouseBodySchema = z.object({
	addressNumber: z.string(),
	addressComplement: z.string(),
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
	pool: z.coerce.number().optional(),
	deck: z.boolean(),
	porch: z.boolean(),
	backyard: z.boolean(),
	driveWay: z.boolean(),
	frontYard: z.boolean()
});

type CreateHouseBodySchema = z.infer<typeof createHouseBodySchema>