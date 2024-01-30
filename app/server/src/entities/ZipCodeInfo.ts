import { Entity } from './entity';
import { Optional } from '@/utils/optional';

export interface IZipCodeInfoProps {
	zipCode: string
	street: string
	neighborhood: string
	city: string
	state: string
	createdAt: Date
}

export class ZipCodeInfo extends Entity<IZipCodeInfoProps> {
	
	static create(props: Optional<IZipCodeInfoProps, 'createdAt'>, id?: string) {
		return new ZipCodeInfo({
			...props,
			createdAt: props.createdAt ?? new Date()
		}, id);
	}

	get zipCode(): string {
		return this.props.zipCode;
	}

	get street(): string {
		return this.props.street;
	}

	get neighborhood(): string {
		return this.props.neighborhood;
	}

	get city(): string {
		return this.props.city;
	}

	get state(): string {
		return this.props.state;
	}

	get createdAt(): Date {
		return this.props.createdAt;
	}
}