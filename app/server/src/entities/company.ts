import { Entity } from './entity';
import { Optional } from '@/utils/optional';

export interface ICompanyProps {
    cod?: number
    name: string
	password: string
    agentsIds: string[]
    propertiesIds: string[]
    contactId: string
    addressId: string
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

	get password(): string {
		return this.props.password;
	}

	get agentsIds(): string[] {
		return this.props.agentsIds;
	}

	get propertiesIds(): string[] {
		return this.props.propertiesIds;
	}

	get contactId(): string {
		return this.props.contactId;
	}

	get addressId(): string {
		return this.props.addressId;
	}

	get createdAt(): Date {
		return this.props.createdAt;
	}
}