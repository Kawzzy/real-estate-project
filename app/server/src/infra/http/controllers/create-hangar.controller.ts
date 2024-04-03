import { z } from 'zod';
import { AuthGuard } from '@nestjs/passport';
import { IRequestBody } from '@/utils/request-utils';
import { CreateHangarUseCase } from '@/use-cases/create-hangar';
import { UserPayload } from '@/infra/auth/sources/jwt.strategy';
import { CommercialType } from '@/entities/enums/commercial-type';
import { PropertyStatus } from '@/entities/enums/property-status';
import { CurrentUser } from '@/infra/auth/sources/current-user.decorator';
import { Body, Controller, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateZipCodeInfoInterceptor } from '../interceptors/create-zip-code-info-interceptor';

@Controller('/create-hangar')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(CreateZipCodeInfoInterceptor)
export class CreateHangarController {
	constructor(private createHangar: CreateHangarUseCase) {}

    @Post()
	async handle(@Body() body: CreateHangarBodySchema, @Request() request: IRequestBody, @CurrentUser() user: UserPayload) {
		const { addressComplement, addressNumber, areaSize, builtYear, description, floors, imagesIds,
			internetAccess, office, parkingLot, price, restRoom, securitySystem, sponsorId, status,
		} = createHangarBodySchema.parse(body);
        
		const ownerId = user.sub;

		const { zipCodeInfo } = request;

		await this.createHangar.handle({
			zipCodeInfo,
			addressComplement,
			addressNumber,
			areaSize,
			builtYear,
			description,
			imagesIds,
			internetAccess,
			office,
			ownerId,
			parkingLot,
			price,
			restRoom,
			securitySystem,
			sponsorId,
			status,
			type: CommercialType.HANGAR,
			floors,
		});
	}
}

const createHangarBodySchema = z.object({
	addressComplement: z.string(),
	addressNumber: z.string(),
	description: z.string(),
	status: z.enum([PropertyStatus.FOR_BUY, PropertyStatus.FOR_RENT]),
	price: z.coerce.number(),
	areaSize: z.coerce.number(),
	floors: z.coerce.number().optional(),
	builtYear: z.coerce.number(),
	imagesIds: z.array(z.string()),
	sponsorId: z.string(),
	office: z.boolean(),
	securitySystem: z.boolean(),
	internetAccess: z.boolean(),
	restRoom: z.coerce.number(),
	parkingLot: z.boolean()
});

type CreateHangarBodySchema = z.infer<typeof createHangarBodySchema>