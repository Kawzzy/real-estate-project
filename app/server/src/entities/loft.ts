import { Optional } from '@/utils/optional';
import { IResidentialProps, Residential } from './residential';

export interface ILoftProps extends IResidentialProps {}

export class Loft extends Residential<ILoftProps> {
    
	static create(props: Optional<ILoftProps, 'createdAt'>, id?: string) {
		return new Loft({
			...props,
			createdAt: props.createdAt ?? new Date()
		}, id);
	}
}