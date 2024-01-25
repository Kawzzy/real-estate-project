export interface IContactAtts {
    telephone?: string
    cellphone: string
    email: string
}

export class Contact {
	private _telephone: string;
	private _cellphone: string;
	private _email: string;

	constructor({ telephone, cellphone, email }: IContactAtts) {
		this._telephone = telephone;
		this._cellphone = cellphone;
		this._email = email;
	}

	static create({ telephone, cellphone, email }: IContactAtts) {
		return new Contact({ telephone, cellphone, email });
	}
    
	get telephone() : string {
		return this.telephone;
	}
    
	get cellphone() : string {
		return this.telephone;
	}
    
	get email() : string {
		return this.telephone;
	}
}