import { z } from 'zod';
import { Observable } from 'rxjs';
import { ZipCodeInfo } from '@/entities/zipCodeInfo';
import { CreateZipCodeInfoUseCase } from '@/use-cases/create-zipcode-info';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

const zipCodeInfoInterceptorReq = z.object({
	zipCode: z.string().refine(zipCode => {
		const regex = /^\d{5}-\d{3}$/;
		return regex.test(zipCode);
	}, {
		message: 'Invalid zip code format. Expected format: ddddd-ddd'
	})
});

type ZipCodeInfoInterceptorResponseType = {
    name: string
    telephone: string
    cellphone: string
    email: string
    zipCodeInfo: ZipCodeInfo
    addressNumber: string
    addressComplement: string
}

@Injectable()
export class CreateZipCodeInfoInterceptor implements NestInterceptor {
	constructor(private zipCodeInfoUseCase: CreateZipCodeInfoUseCase) {}
    
	async intercept(context: ExecutionContext, next: CallHandler<ZipCodeInfoInterceptorResponseType>): Promise<Observable<ZipCodeInfoInterceptorResponseType>> {
		const req = context.switchToHttp().getRequest();
		const { body } = req;
		const { zipCode } = zipCodeInfoInterceptorReq.parse(body);

		const result = await this.zipCodeInfoUseCase.handle({ zipCode });
		const { zipCodeInfo } = result.value;
		
		delete body.zipCode;
		
		req.zipCodeInfo = zipCodeInfo;

		return next.handle();
	}
}