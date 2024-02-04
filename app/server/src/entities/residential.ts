import { IPropertyProps, Property } from './property';
import { ResidentialType } from './enums/residential-type';

export interface IResidentialProps extends IPropertyProps {
    condominium: string
    condominiumTax: number
    amenities: number
    pool: number
    heat: number
    airConditioner: number
    balcony: number
    laundry: number
    garage: number
    elevator: number
    bedrooms: number
    bathrooms: number
    kitchen: number
    livingRoom: number
    dinnerRoom: number
    playground: boolean
    gym: boolean
    socialSpace: boolean
	furniture: boolean
    type: ResidentialType
}

export abstract class Residential<Props extends IResidentialProps> extends Property<IResidentialProps> {
    
	constructor(props: Props, id?: string) {
		super(props, id);
	}

	get condominium(): string {
		return this.condominium;
	}

	get condominiumTax(): number {
		return this.condominiumTax;
	}

	get amenities(): number {
		return this.amenities;
	}

	get pool(): number {
		return this.pool;
	}

	get heat(): number {
		return this.heat;
	}

	get airConditioner(): number {
		return this.airConditioner;
	}

	get balcony(): number {
		return this.balcony;
	}

	get laundry(): number {
		return this.laundry;
	}

	get garage(): number {
		return this.garage;
	}

	get elevator(): number {
		return this.elevator;
	}

	get bedrooms(): number {
		return this.bedrooms;
	}

	get bathrooms(): number {
		return this.bathrooms;
	}

	get kitchen(): number {
		return this.kitchen;
	}

	get livingRoom(): number {
		return this.livingRoom;
	}

	get dinnerRoom(): number {
		return this.dinnerRoom;
	}

	get playground(): boolean {
		return this.playground;
	}

	get gym(): boolean {
		return this.gym;
	}

	get socialSpace(): boolean {
		return this.socialSpace;
	}

	get furniture(): boolean {
		return this.furniture;
	}

	get type(): ResidentialType {
		return this.type;
	}
}