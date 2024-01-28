import { Entity } from './entity';
import { Address } from './value-objects/address';
import { PropertyType } from './enums/property-type';
import { Amenities } from './value-objects/amenities';
import { PropertyStatus } from './enums/property-status';

export interface IPropertyProps {
    id?: string
	cod: number
	description: string
	type: PropertyType
	status: PropertyStatus
	address: Address
	price: number
	areaSize: number
	floors: number
	amenities: Amenities
	builtYear: number
	hasFurniture: boolean
	imagesIds: string[]
	ownerId: string
	sponsorId: string
	createdAt: Date
	updatedAt: Date | null
}

export class Property extends Entity<IPropertyProps> {

	static create(props: IPropertyProps, id?: string) {
		return new Property(props, id);
	}

	get id(): string {
		return this.props.id;
	}

	get cod(): number {
		return this.props.cod;
	}

	get description(): string {
		return this.props.description;
	}

	get type(): PropertyType {
		return this.props.type;
	}

	get status(): PropertyStatus {
		return this.props.status;
	}

	get address(): Address {
		return this.props.address;
	}

	get price(): number {
		return this.props.price;
	}

	get areaSize(): number {
		return this.props.areaSize;
	}

	get floors(): number {
		return this.props.floors;
	}

	get amenities(): Amenities {
		return this.props.amenities;
	}

	get builtYear(): number {
		return this.props.builtYear;
	}

	get hasFurniture(): boolean {
		return this.props.hasFurniture;
	}

	get imagesIds(): string[] {
		return this.props.imagesIds;
	}

	get ownerId(): string {
		return this.props.ownerId;
	}

	get sponsorId(): string {
		return this.props.sponsorId;
	}

	get createdAT(): Date {
		return this.props.createdAt;
	}

	get updatedAt(): Date {
		return this.props.updatedAt;
	}
}