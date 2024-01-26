import { randomUUID } from 'node:crypto';
import { Contact } from './value-objects/contact';

export interface IAgentAtts {
    id?: string;
    cod: number;
    name: string;
    contact: Contact;
    companyId: string;
    propertiesIds: string[];
}

export class Agent {
	private _id: string;
	private _cod: number;
	private _name: string;
	private _contact: Contact;
	private _companyId: string;
	private _propertiesIds: string[];

	constructor({ id, cod, name, contact, companyId, propertiesIds }: IAgentAtts) {
		this._id = id ?? randomUUID();
		this._cod = cod;
		this._name = name;
		this._contact = contact;
		this._companyId = companyId;
		this._propertiesIds = propertiesIds;
	}

	static create({ id, cod, name, contact, companyId, propertiesIds }: IAgentAtts) {
		return new Agent({ id, cod, name, contact, companyId, propertiesIds });
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
    
	get companyId(): string {
		return this._companyId;
	}
    
	get propertiesIds(): string[] {
		return this._propertiesIds;
	}
}