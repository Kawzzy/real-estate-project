import { Optional } from '@/utils/optional';
import { ICommercialProps, Commercial } from './commercial';

export interface ICommercialRoomProps extends ICommercialProps {}

export class CommercialRoom extends Commercial<ICommercialRoomProps> {
    
	declare protected props: ICommercialRoomProps;

	static create(props: Optional<ICommercialRoomProps, 'createdAt'>, id?: string) {
		return new CommercialRoom({
			...props,
			createdAt: props.createdAt ?? new Date()
		}, id);
	}
}