import { Studio } from '@/entities/studio';
import { PropertyRepository } from '@/repositories/property-repository';

export class InMemoryStudioRepository implements PropertyRepository<Studio> {
    
	public studios: Studio[] = [];

	async create(property: Studio): Promise<void> {
		this.studios.push(property);
	}
}