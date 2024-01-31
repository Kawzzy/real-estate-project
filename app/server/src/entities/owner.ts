import { Entity } from './entity';
import { Optional } from '@/utils/optional';
import { Contact } from './value-objects/contact';

export interface IOwnerProps {
    cod?: number
    name: string
    contact: Contact
    propertiesIds: string[]
	createdAt: Date
}

export class Owner extends Entity<IOwnerProps> {

	static create(props: Optional<IOwnerProps, 'createdAt'>, id?: string) {
		return new Owner({
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
    
	get contact(): Contact {
		return this.props.contact;
	}
    
	get propertiesIds(): string[] {
		return this.props.propertiesIds;
	}
    
	get createdAt(): Date {
		return this.props.createdAt;
	}
}