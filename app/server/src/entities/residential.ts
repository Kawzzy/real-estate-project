import { IPropertyProps, Property } from './property';
import { ResidentialType } from './enums/residential-type';

export interface IResidentialProps extends IPropertyProps {
    condominium?: string
    condominiumTax?: number
    amenities: number
    pool?: number
    heat?: number
    airConditioner?: number
    balcony?: number
    laundry?: number
    garage?: number
    elevator?: number
    bedrooms?: number
    bathrooms?: number
    kitchen?: number
    livingRoom?: number
    dinnerRoom?: number
    playground?: boolean
    gym?: boolean
    socialSpace?: boolean
    type: ResidentialType
}

export abstract class Residential<Props extends IResidentialProps> extends Property<IResidentialProps> {

	declare protected props: IResidentialProps;
    
	constructor(props: Props, id?: string) {
		super(props, id);
	}

	get condominium(): string {
		return this.props.condominium;
	}

	get condominiumTax(): number {
		return this.props.condominiumTax;
	}

	get amenities(): number {
		return this.props.amenities;
	}

	get pool(): number {
		return this.props.pool;
	}

	get heat(): number {
		return this.props.heat;
	}

	get airConditioner(): number {
		return this.props.airConditioner;
	}

	get balcony(): number {
		return this.props.balcony;
	}

	get laundry(): number {
		return this.props.laundry;
	}

	get garage(): number {
		return this.props.garage;
	}

	get elevator(): number {
		return this.props.elevator;
	}

	get bedrooms(): number {
		return this.props.bedrooms;
	}

	get bathrooms(): number {
		return this.props.bathrooms;
	}

	get kitchen(): number {
		return this.props.kitchen;
	}

	get livingRoom(): number {
		return this.props.livingRoom;
	}

	get dinnerRoom(): number {
		return this.props.dinnerRoom;
	}

	get playground(): boolean {
		return this.props.playground;
	}

	get gym(): boolean {
		return this.props.gym;
	}

	get socialSpace(): boolean {
		return this.props.socialSpace;
	}

	get type(): ResidentialType {
		return this.props.type;
	}
}