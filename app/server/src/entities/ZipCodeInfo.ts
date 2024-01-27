import { Entity } from './entity';

export interface IZipCodeInfoProps {
	zipCode: string
	street: string
	neighborhood: string
	city: string
	state: string
	country: string
	createdAt: Date
}

export class ZipCodeInfo extends Entity<IZipCodeInfoProps> {
	
	static create(props: IZipCodeInfoProps, id?: string) {
		return new ZipCodeInfo(props, id);
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

	get country(): string {
		return this.props.country;
	}

	get createdAt(): Date {
		return this.props.createdAt;
	}
}