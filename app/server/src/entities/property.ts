import { randomUUID } from 'node:crypto';
import { Address } from './value-objects/address';

export interface IPropertyAtts {
    id?: string;
	cod: number;
	description: string;
	type: string;
	status: string;
	address: Address;
	price: number;
	areaSize: number;
	floors: number;
	amenities: string;
	builtYear: number;
	hasFurniture: boolean;
	imagesIds: string[];
	ownerId: string;
	sponsorId: string;
}

export class Property {
	private _id: string;
	private _cod: number;
	private _description: string;
	private _type: string;
	private _status: string;
	private _address: Address;
	private _price: number;
	private _areaSize: number;
	private _floors: number;
	private _amenities: string;
	private _builtYear: number;
	private _hasFurniture: boolean;
	private _imagesIds: string[];
	private _ownerId: string;
	private _sponsorId: string;

	constructor({ id, cod, description, type, status, address, price, areaSize, floors, amenities, builtYear, 
		hasFurniture, imagesIds, ownerId, sponsorId }: IPropertyAtts) {
		this._id = id ?? randomUUID();
		this._cod = cod;
		this._description = description;
		this._type = type;
		this._status = status;
		this._address = address;
		this._price = price;
		this._areaSize = areaSize;
		this._floors = floors;
		this._amenities = amenities;
		this._builtYear = builtYear;
		this._hasFurniture = hasFurniture;
		this._imagesIds = imagesIds;
		this._ownerId = ownerId;
		this._sponsorId = sponsorId;
	}

	get id(): string {
		return this._id;
	}

	get cod(): number {
		return this._cod;
	}

	get description(): string {
		return this._description;
	}

	get type(): string {
		return this._type;
	}

	get status(): string {
		return this._status;
	}

	get address(): Address {
		return this._address;
	}

	get price(): number {
		return this._price;
	}

	get areaSize(): number {
		return this._areaSize;
	}

	get floors(): number {
		return this._floors;
	}

	get amenities(): string {
		return this._amenities;
	}

	get builtYear(): number {
		return this._builtYear;
	}

	get hasFurniture(): boolean {
		return this._hasFurniture;
	}

	get imagesIds(): string[] {
		return this._imagesIds;
	}

	get ownerId(): string {
		return this._ownerId;
	}

	get sponsorId(): string {
		return this._sponsorId;
	}   
}