import { Entity } from './entity';
import { Optional } from '@/utils/optional';

export interface IContactProps {
    telephone?: string
    cellphone: string
    email: string
    createdAt: Date
}

export class Contact extends Entity<IContactProps> {
	
	static create(props: Optional<IContactProps, 'createdAt'>, id?: string) {
		return new Contact({
			...props,
			createdAt: props.createdAt ?? new Date()
		}, id);
	}
    
	get telephone(): string {
		return this.props.telephone;
	}
    
	get cellphone(): string {
		return this.props.cellphone;
	}
    
	get email(): string {
		return this.props.email;
	}
    
	get createdAt(): Date {
		return this.props.createdAt;
	}
}