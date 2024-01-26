import { randomUUID } from 'node:crypto';
import { Contact } from './value-objects/contact';

export interface IOwnerAtts {
    id?: string
    cod: number
    name: string
    contact: Contact
    propertiesIds: string[]
}

export class Owner {
	private _id: string;
	private _cod: number;
	private _name: string;
	private _contact: Contact;
	private _propertiesIds: string[];

	constructor({ id, cod, name, contact, propertiesIds }: IOwnerAtts) {
		this._id = id ?? randomUUID();
		this._cod = cod;
		this._name = name;
		this._contact = contact;
		this._propertiesIds = propertiesIds;
	}

	static create({ id, cod, name, contact, propertiesIds }: IOwnerAtts) {
		return new Owner({ id, cod, name, contact, propertiesIds});
	}

	get id(): string {
		return this._id;
	}
    
	get cod(): number {
		return this._cod;
	}
    
	get name(): string {
		return this._name;
	}
    
	get contact(): Contact {
		return this._contact;
	}
    
	get propertiesIds(): string[] {
		return this._propertiesIds;
	}
}