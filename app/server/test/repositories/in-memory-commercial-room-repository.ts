import { CommercialRoom } from '@/entities/commercial-room';
import { PropertyRepository } from '@/repositories/property-repository';

export class InMemoryCommercialRoomRepository implements PropertyRepository<CommercialRoom> {
    
	public commercialRooms: CommercialRoom[] =[];

	async create(property: CommercialRoom): Promise<void> {
		this.commercialRooms.push(property);
	}
}