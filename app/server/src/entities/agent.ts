import { Entity } from './entity';
import { Optional } from '@/utils/optional';

export interface IAgentProps {
    cod?: number;
    name: string;
    contactId: string;
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
    
	get contactId(): string {
		return this.props.contactId;
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