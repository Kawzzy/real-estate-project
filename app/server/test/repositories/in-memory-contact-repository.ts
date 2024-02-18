import { Contact } from '@/entities/contact';
import { ContactRepository } from '@/repositories/contact-repository';

export class InMemoryContactRepository implements ContactRepository {
    
	public contacts: Contact[] = [];

	async create(contact: Contact): Promise<void> {
		this.contacts.push(contact);
	}
}