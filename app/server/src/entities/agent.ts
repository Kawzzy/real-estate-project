import { Entity } from './entity';
import { Contact } from './value-objects/contact';

export interface IAgentProps {
    id?: string;
    cod: number;
    name: string;
    contact: Contact;
    companyId: string;
    propertiesIds: string[];
	createdAt: Date
}

export class Agent extends Entity<IAgentProps> {

	static create(props: IAgentProps, id?: string) {
		return new Agent(props, id);
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
    
	get companyId(): string {
		return this.props.companyId;
	}
    
	get propertiesIds(): string[] {
		return this.props.propertiesIds;
	}
    
	get createdAt(): Date {
		return this.props.createdAt;
	}
}