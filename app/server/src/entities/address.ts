import { Entity } from './entity';
import { Optional } from '@/utils/optional';

export interface IAddressProps {
    zipCode: string
    number: string
    complement?: string
    createdAt: Date
}

export class Address extends Entity<IAddressProps> {

	static create(props: Optional<IAddressProps, 'createdAt'>, id?: string) {
		return new Address({
			...props,
			createdAt: props.createdAt ?? new Date()
		}, id);
	}

	get zipCode(): string {
		return this.props.zipCode;
	}

	get number(): string {
		return this.props.number;
	}

	get complement(): string {
		return this.props.complement;
	}

	get createdAt(): Date {
		return this.props.createdAt;
	}
}