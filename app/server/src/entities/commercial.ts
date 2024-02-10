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
    
	declare protected props: ICommercialProps;

	constructor(props: Props, id?: string) {
		super(props, id);
	}

	get office(): boolean {
		return this.props.office;
	}

	get securitySystem(): boolean {
		return this.props.securitySystem;
	}

	get internetAccess(): boolean {
		return this.props.internetAccess;
	}

	get restRoom(): number {
		return this.props.restRoom;
	}

	get type(): CommercialType {
		return this.props.type;
	}
}