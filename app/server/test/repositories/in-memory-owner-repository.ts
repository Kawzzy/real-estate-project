import { Owner } from '@/entities/owner';
import { OwnerRepository } from '@/repositories/owner-repository';

export class InMemoryOwnerRepository implements OwnerRepository {
	
	public owners: Owner[] = [];
    
	async create(owner: Owner): Promise<void> {
		this.owners.push(owner);
	}
    
	async findByEmail(email: string): Promise<Owner> {
		return this.owners.find(owner => owner.contact.email === email) ?? null;
	}
}