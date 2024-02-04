import { Optional } from '@/utils/optional';
import { ICommercialProps, Commercial } from './commercial';

export interface IHangarProps extends ICommercialProps {
    parkingLot: boolean
}

export class Hangar extends Commercial<IHangarProps> {
    
	static create(props: Optional<IHangarProps, 'createdAt'>, id?: string) {
		return new Hangar({
			...props,
			createdAt: props.createdAt ?? new Date()
		}, id);
	}

	get parkingLot(): boolean {
		return this.parkingLot;
	}
}