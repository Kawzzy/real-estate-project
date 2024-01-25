export interface IZipCodeInfoAtts {
	zipCode: string;
	street: string;
	neighborhood: string;
	city: string;
	state: string;
	country: string;
}

export class ZipCodeInfo {
	private _zipCode: string;
	private _street: string;
	private _neighborhood: string;
	private _city: string;
	private _state: string;
	private _country: string;
    
	constructor({ zipCode, street, neighborhood, city, state, country }: IZipCodeInfoAtts) {
		this._zipCode = zipCode;
		this._street = street;
		this._neighborhood = neighborhood;
		this._city = city;
		this._state = state;
		this._country = country;
	}

	static create({ zipCode, street, neighborhood, city, state, country }: IZipCodeInfoAtts) {
		return new ZipCodeInfo({ zipCode, street, neighborhood, city, state, country });
	}

	public get zipCode() : string {
		return this.zipCode;
	}

	public get street() : string {
		return this.street;
	}

	public get neighborhood() : string {
		return this.neighborhood;
	}

	public get city() : string {
		return this.city;
	}

	public get state() : string {
		return this.state;
	}

	public get country() : string {
		return this.country;
	}
}