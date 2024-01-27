import { Entity } from './entity';
import { Contact } from './value-objects/contact';

export interface IOwnerProps {
    id?: string
    cod: number
    name: string
    contact: Contact
    propertiesIds: string[]
	createdAt: Date
}

export class Owner extends Entity<IOwnerProps> {

	static create(props: IOwnerProps, id?: string) {
		return new Owner(props, id);
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