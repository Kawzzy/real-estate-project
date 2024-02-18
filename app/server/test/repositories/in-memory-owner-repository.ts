import { Owner } from '@/entities/owner';
import { OwnerRepository } from '@/repositories/owner-repository';
import { InMemoryContactRepository } from './in-memory-contact-repository';

export class InMemoryOwnerRepository implements OwnerRepository {
	
	public owners: Owner[] = [];

	constructor(private inMemoryContactRepository: InMemoryContactRepository) {}
    
	async create(owner: Owner): Promise<void> {
		this.owners.push(owner);
	}
    
	async findByEmail(email: string): Promise<Owner> {
		const contact = this.inMemoryContactRepository.contacts.find(contact => contact.email === email);
		return this.owners.find(owner => owner.contactId === contact.id) ?? null;
	}
}