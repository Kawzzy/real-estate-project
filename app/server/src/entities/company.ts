import { Entity } from './entity';
import { Address } from './value-objects/address';
import { Contact } from './value-objects/contact';

export interface ICompanyProps {
    id?: string
    cod: number
    name: string
    agentsIds: string[]
    propertiesIds: string[]
    contact: Contact
    address: Address
	createdAt: Date
}

export class Company extends Entity<ICompanyProps> {

	static create(props: ICompanyProps, id?: string) {
		return new Company(props, id);
	}

	get id(): string {
		return this.props.id;
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