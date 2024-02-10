import { Optional } from '@/utils/optional';
import { ICommercialProps, Commercial } from './commercial';

export interface ICommercialRoomProps extends ICommercialProps {
    furniture: boolean
}

export class CommercialRoom extends Commercial<ICommercialRoomProps> {
    
	declare protected props: ICommercialRoomProps;

	static create(props: Optional<ICommercialRoomProps, 'createdAt'>, id?: string) {
		return new CommercialRoom({
			...props,
			createdAt: props.createdAt ?? new Date()
		}, id);
	}

	get furniture(): boolean {
		return this.props.furniture;
	}
}