import { z } from 'zod';
import { AuthGuard } from '@nestjs/passport';
import { IRequestBody } from '@/utils/request-utils';
import { UserPayload } from '@/infra/auth/sources/jwt.strategy';
import { CommercialType } from '@/entities/enums/commercial-type';
import { PropertyStatus } from '@/entities/enums/property-status';
import { CurrentUser } from '@/infra/auth/sources/current-user.decorator';
import { CreateCommercialRoomUseCase } from '@/use-cases/create-commercial-room';
import { Body, Controller, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateZipCodeInfoInterceptor } from '../interceptors/create-zip-code-info-interceptor';

@Controller('/create-commercial-room')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(CreateZipCodeInfoInterceptor)
export class CreateCommercialRoomController {
	constructor(private createCommercialRoom: CreateCommercialRoomUseCase) {}
    
    @Post()
	async handle(@Body() body: CreateCommercialRoomBodySchema, @Request() request: IRequestBody, @CurrentUser() user: UserPayload) {
		const { addressComplement, addressNumber, areaSize, builtYear, description, floors, furniture, imagesIds,
			internetAccess, office, price, restRoom, securitySystem, sponsorId, status
		} = createCommercialRoomBodySchema.parse(body);

		const ownerId = user.sub;

		const { zipCodeInfo } = request;

		this.createCommercialRoom.handle({
			addressComplement,
			addressNumber,
			areaSize,
			builtYear,
			description,
			furniture,
			imagesIds,
			internetAccess,
			office,
			ownerId,
			price,
			restRoom,
			securitySystem,
			sponsorId,
			status,
			type: CommercialType.COMMERCIAL_ROOM,
			zipCodeInfo,
			floors
		});
	}
}

const createCommercialRoomBodySchema = z.object({
	addressNumber: z.string(),
	addressComplement: z.string(),
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
	furniture: z.boolean()
});

type CreateCommercialRoomBodySchema = z.infer<typeof createCommercialRoomBodySchema>