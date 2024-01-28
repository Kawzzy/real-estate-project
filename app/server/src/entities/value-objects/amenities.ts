import { ValueObject } from './value-object';

export interface IAmenitiesProps {
    bedrooms?: number
    bathrooms?: number
    kitchen?: number
    livingRoom?: number
    dinnerRoom?: number
    pool?: number
    heat?: number
    airConditioner?: number
    balcony?: number
    laundry?: number
    garage?: number
    elevator?: number
    hasPorch?: boolean
    hasBackyard?: boolean
    hasFrontYard?: boolean
    hasDeck?: boolean
    hasPlayground?: boolean
    hasGym?: boolean
    hasSocialSpace?: boolean
}

export class Amenities extends ValueObject<IAmenitiesProps> {
    
	static create(props: IAmenitiesProps) {
		return new Amenities(props);
	}

	get bedrooms(): number {
		return this.props.bedrooms ?? 0;
	}

	get bathrooms(): number {
		return this.props.bathrooms ?? 0;
	}

	get kitchen(): number {
		return this.props.kitchen ?? 0;
	}

	get livingRoom(): number {
		return this.props.livingRoom ?? 0;
	}

	get dinnerRoom(): number {
		return this.props.dinnerRoom ?? 0;
	}

	get pool(): number {
		return this.props.pool ?? 0;
	}

	get heat(): number {
		return this.props.heat ?? 0;
	}

	get airConditioner(): number {
		return this.props.airConditioner ?? 0;
	}

	get balcony(): number {
		return this.props.balcony ?? 0;
	}

	get laundry(): number {
		return this.props.laundry ?? 0;
	}

	get garage(): number {
		return this.props.garage ?? 0;
	}

	get elevator(): number {
		return this.props.elevator ?? 0;
	}

	get hasPorch(): boolean {
		return this.props.hasPorch;
	}

	get hasBackyard(): boolean {
		return this.props.hasBackyard;
	}

	get hasFrontYard(): boolean {
		return this.props.hasFrontYard;
	}

	get hasDeck(): boolean {
		return this.props.hasDeck;
	}

	get hasPlayground(): boolean {
		return this.props.hasPlayground;
	}

	get hasGym(): boolean {
		return this.props.hasGym;
	}

	get hasSocialSpace(): boolean {
		return this.props.hasSocialSpace;
	}
}