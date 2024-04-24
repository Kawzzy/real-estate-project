import { CommercialRoom } from '@/entities/commercial-room';
import { PropertyRepository } from '@/repositories/property-repository';

export class InMemoryCommercialRoomRepository implements PropertyRepository<CommercialRoom> {
    
	public commercialRooms: CommercialRoom[] =[];

	async create(property: CommercialRoom): Promise<void> {
		this.commercialRooms.push(property);
	}
	
	async getAll(): Promise<CommercialRoom[] | []> {
		return this.commercialRooms;
	}

	async get(propertyId: string): Promise<CommercialRoom | null> {
		const commercialRoom = this.commercialRooms.find(commercialRoom => commercialRoom.id == propertyId);

		return commercialRoom ?? null;
	}

	async delete(propertyId: string): Promise<void> {
		const index = this.commercialRooms.findIndex(commercialRoom => commercialRoom.id === propertyId);

		this.commercialRooms.splice(index, 1);
	}
}