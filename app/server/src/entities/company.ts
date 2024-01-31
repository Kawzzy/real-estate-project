import { Entity } from './entity';
import { Optional } from '@/utils/optional';
import { Address } from './value-objects/address';
import { Contact } from './value-objects/contact';

export interface ICompanyProps {
    cod?: number
    name: string
    agentsIds: string[]
    propertiesIds: string[]
    contact: Contact
    address: Address
	createdAt: Date
}

export class Company extends Entity<ICompanyProps> {

	static create(props: Optional<ICompanyProps, 'createdAt'>, id?: string) {
		return new Company({
			...props,
			createdAt: props.createdAt ?? new Date()
		}, id);
	}

	get cod(): number {
		return this.props.cod;
	}

	get name(): string {
		return this.props.name;
	}

	get agentsIds(): string[] {
		return this.props.agentsIds;
	}

	get propertiesIds(): string[] {
		return this.props.propertiesIds;
	}

	get contact(): Contact {
		return this.props.contact;
	}

	get address(): Address {
		return this.props.address;
	}

	get createdAt(): Date {
		return this.props.createdAt;
	}
}