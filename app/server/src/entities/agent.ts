import { Entity } from './entity';
import { Optional } from '@/utils/optional';
import { Contact } from './value-objects/contact';

export interface IAgentProps {
    cod?: number;
    name: string;
    contact: Contact;
    companyId: string;
    propertiesIds: string[];
	createdAt: Date
}

export class Agent extends Entity<IAgentProps> {

	static create(props: Optional<IAgentProps, 'createdAt'>, id?: string) {
		return new Agent({
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