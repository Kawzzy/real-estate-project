import { Entity } from './entity';
import { PropertyStatus } from './enums/property-status';

export interface IPropertyProps {
    cod?: number
	description: string
	status: PropertyStatus
	addressId: string
	price: number
	areaSize: number
	floors?: number
	furniture?: boolean
	builtYear: number
	imagesIds: string[]
	ownerId: string
	sponsorId: string
	createdAt: Date
	updatedAt?: Date | null
}

export abstract class Property<Props extends IPropertyProps> extends Entity<IPropertyProps> {

	declare protected props: IPropertyProps;

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

	get addressId(): string {
		return this.props.addressId;
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

	get furniture(): boolean {
		return this.props.furniture;
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

	get createdAt(): Date {
		return this.props.createdAt;
	}

	get updatedAt(): Date {
		return this.props.updatedAt;
	}
}