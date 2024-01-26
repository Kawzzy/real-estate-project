import { randomUUID } from 'node:crypto';
import { Address } from './value-objects/address';
import { Contact } from './value-objects/contact';

export interface ICompanyAtts {
    id?: string
    cod: number
    name: string
    agentsIds: string[]
    propertiesIds: string[]
    contact: Contact
    address: Address
}

export class Company {
	private _id: string;
	private _cod: number;
	private _name: string;
	private _agentsIds: string[];
	private _propertiesIds: string[];
	private _contact: Contact;
	private _address: Address;

	constructor({ id, cod, name, agentsIds, propertiesIds, contact, address }: ICompanyAtts) {
		this._id = id ?? randomUUID();
		this._cod = cod;
		this._name = name;
		this._agentsIds = agentsIds;
		this._propertiesIds = propertiesIds;
		this._contact = contact;
		this._address = address;
	}

	static create({ id, cod, name, agentsIds, propertiesIds, contact, address }: ICompanyAtts) {
		return new Company({ id, cod, name, agentsIds, propertiesIds, contact, address });
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

	get agentsIds(): string[] {
		return this._agentsIds;
	}

	get propertiesIds(): string[] {
		return this._propertiesIds;
	}

	get contact(): Contact {
		return this._contact;
	}

	get address(): Address {
		return this._address;
	}   
}