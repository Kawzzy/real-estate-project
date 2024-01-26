import { ValueObject } from './value-object';

export interface IContactProps {
    telephone?: string
    cellphone: string
    email: string
}

export class Contact extends ValueObject<IContactProps> {
	
	static create(props: IContactProps) {
		return new Contact(props);
	}
    
	get telephone() : string {
		return this.props.telephone;
	}
    
	get cellphone() : string {
		return this.props.cellphone;
	}
    
	get email() : string {
		return this.props.email;
	}
}