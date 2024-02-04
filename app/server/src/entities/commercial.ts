import { IPropertyProps, Property } from './property';
import { CommercialType } from './enums/commercial-type';

export interface ICommercialProps extends IPropertyProps {
	office: boolean
	securitySystem: boolean
	internetAccess: boolean
	restRoom: number
    type: CommercialType
}

export abstract class Commercial<Props extends ICommercialProps> extends Property<IPropertyProps> {
    
	constructor(props: Props, id?: string) {
		super(props, id);
	}

	get office(): boolean {
		return this.office;
	}

	get securitySystem(): boolean {
		return this.securitySystem;
	}

	get internetAccess(): boolean {
		return this.internetAccess;
	}

	get restRoom(): number {
		return this.restRoom;
	}

	get type(): CommercialType {
		return this.type;
	}
}