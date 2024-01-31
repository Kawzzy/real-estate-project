import { Owner } from '@/entities/owner';
import { Contact } from '@/entities/value-objects/contact';
import { OwnerRepository } from '@/repositories/owner-repository';
import { EmailAlreadyExistsError } from '@/errors/email-already-exists-error';

interface CreateOwnerUseCaseRequest {
    name: string
    contact: Contact
    propertiesIds: string[]
}

interface CreateOwnerUseCaseResponse {
    owner: Owner
}

export class CreateOwnerUseCase {

	constructor(private ownerRepository: OwnerRepository) {}

	async handle({ name, contact, propertiesIds }: CreateOwnerUseCaseRequest): Promise<CreateOwnerUseCaseResponse> {

		const existingOwner = await this.ownerRepository.findByEmail(contact.email);

		if (existingOwner) {
			throw new EmailAlreadyExistsError(contact.email);
		}

		const owner = Owner.create({
			name,
			contact,
			propertiesIds
		});

		await this.ownerRepository.create(owner);

		return { owner };
	}
}