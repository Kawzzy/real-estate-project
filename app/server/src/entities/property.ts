import { Entity } from './entity';
import { Address } from './value-objects/address';
import { PropertyStatus } from './enums/property-status';

export interface IPropertyProps {
    cod?: number
	description: string
	status: PropertyStatus
	address: Address
	price: number
	areaSize: number
	floors: number
	builtYear: number
	imagesIds: string[]
	ownerId: string
	sponsorId: string
	createdAt: Date
	updatedAt: Date | null
}

export abstract class Property<Props extends IPropertyProps> extends Entity<IPropertyProps> {

	constructor(props: Props, id?: string) {
		super(props, id);
	}

	get cod(): number {
		return this.props.cod;
	}

	get description(): string {
		return this.props.description;
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

	get builtYear(): number {
		return this.props.builtYear;
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