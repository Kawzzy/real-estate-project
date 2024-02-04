import { Optional } from '@/utils/optional';
import { IResidentialProps, Residential } from './residential';

export interface IStudioProps extends IResidentialProps {}

export class Studio extends Residential<IStudioProps> {
    
	static create(props: Optional<IStudioProps, 'createdAt'>, id?: string) {
		return new Studio({
			...props,
			createdAt: props.createdAt ?? new Date()
		}, id);
	}
}