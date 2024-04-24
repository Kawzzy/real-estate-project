import { Loft } from '@/entities/loft';
import { House } from '@/entities/house';
import { Hangar } from '@/entities/hangar';
import { Studio } from '@/entities/studio';
import { Either, right } from '@/utils/either';
import { Apartment } from '@/entities/apartment';
import { IPaginationParams } from '@/utils/request-utils';
import { CommercialRoom } from '@/entities/commercial-room';
import { PropertyRepository } from '@/repositories/property-repository';

type FetchPropertiesResponse = Either<null, { properties: unknown }>

export class FetchPropertiesUseCase {
	constructor(
        private apartmentRepository: PropertyRepository<Apartment>,
        private studioRepository: PropertyRepository<Studio>,
        private loftRepository: PropertyRepository<Loft>,
        private houseRepository: PropertyRepository<House>,
        private hangarRepository: PropertyRepository<Hangar>,
        private commercialRoomRepository: PropertyRepository<CommercialRoom>
	) {}

	async handle({ page }: IPaginationParams): Promise<FetchPropertiesResponse> {
		const propertiesList = [];

		const apartments = await this.apartmentRepository.getAll();
		apartments.forEach(apartment => propertiesList.push(apartment));
		
		const studios = await this.studioRepository.getAll();
		studios.forEach(studio => propertiesList.push(studio));
		
		const lofts = await this.loftRepository.getAll();
		lofts.forEach(loft => propertiesList.push(loft));
		
		const houses = await this.houseRepository.getAll();
		houses.forEach(houses => propertiesList.push(houses));
		
		const hangars = await this.hangarRepository.getAll();
		hangars.forEach(hangar => propertiesList.push(hangar));
		
		const commercialRooms = await this.commercialRoomRepository.getAll();
		commercialRooms.forEach(commercialRooms => propertiesList.push(commercialRooms));

		const start = (page - 1) * 20;
		const end = start + 20;
		const properties = end > propertiesList.length ? propertiesList.slice(start, propertiesList.length) : propertiesList.slice(start, end);

		return right({
			properties
		});
	}
}