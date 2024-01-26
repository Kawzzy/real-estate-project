import { ZipCodeInfo } from '../ZipCodeInfo';

export interface IAddressAtts {
    zipCodeInfo: ZipCodeInfo;
    number: number;
    complement: string;
}

export class Address {
	private _zipCodeInfo: ZipCodeInfo;
	private _number: number;
	private _complement: string;

	constructor({ zipCodeInfo, number, complement }: IAddressAtts) {
		this._zipCodeInfo = zipCodeInfo;
		this._number = number;
		this._complement = complement;
	}

	static create({ zipCodeInfo, number, complement }: IAddressAtts) {
		return new Address({ zipCodeInfo, number, complement });
	}

	get zipCodeInfo(): ZipCodeInfo {
		return this._zipCodeInfo;
	}

	get number(): number {
		return this._number;
	}

	get complement(): string {
		return this._complement;
	}
}