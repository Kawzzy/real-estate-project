import { ZipCodeInfo } from '../zipCodeInfo';
import { ValueObject } from './value-object';

export interface IAddressProps {
    zipCodeInfo: ZipCodeInfo;
    number: number;
    complement: string;
}

export class Address extends ValueObject<IAddressProps> {

	static create(props: IAddressProps) {
		return new Address(props);
	}

	get zipCodeInfo(): ZipCodeInfo {
		return this.props.zipCodeInfo;
	}

	get number(): number {
		return this.props.number;
	}

	get complement(): string {
		return this.props.complement;
	}
}