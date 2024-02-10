import { Optional } from '@/utils/optional';
import { IResidentialProps, Residential } from './residential';

export interface IHouseProps extends IResidentialProps {
    deck: boolean
    porch: boolean
    backyard: boolean
    driveWay: boolean
    frontYard: boolean
}

export class House extends Residential<IHouseProps> {
    
	declare protected props: IHouseProps;

	static create(props: Optional<IHouseProps, 'createdAt'>, id?: string) {
		return new House({
			...props,
			createdAt: props.createdAt ?? new Date()
		}, id);
	}

	get deck(): boolean {
		return this.props.deck;
	}

	get porch(): boolean {
		return this.props.porch;
	}

	get backyard(): boolean {
		return this.props.backyard;
	}

	get driveWay(): boolean {
		return this.props.driveWay;
	}

	get frontYard(): boolean {
		return this.props.frontYard;
	}
}