import { Optional } from '@/utils/optional';
import { IResidentialProps, Residential } from './residential';

export interface IApartmentProps extends IResidentialProps {}

export class Apartment extends Residential<IApartmentProps> {
    
	static create(props: Optional<IApartmentProps, 'createdAt'>, id?: string) {
		return new Apartment({
			...props,
			createdAt: props.createdAt ?? new Date()
		}, id);
	}
}