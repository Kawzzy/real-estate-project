import { Owner } from '@/entities/owner';
import { Either, left, right } from '@/utils/either';
import { Contact } from '@/entities/value-objects/contact';
import { OwnerRepository } from '@/repositories/owner-repository';
import { EmailAlreadyExistsError } from '@/errors/email-already-exists-error';

interface CreateOwnerUseCaseRequest {
    name: string
    contact: Contact
    propertiesIds: string[]
}

type CreateOwnerUseCaseResponse = Either<EmailAlreadyExistsError, { owner: Owner }>

export class CreateOwnerUseCase {

	constructor(private ownerRepository: OwnerRepository) {}

	async handle({ name, contact, propertiesIds }: CreateOwnerUseCaseRequest): Promise<CreateOwnerUseCaseResponse> {

		const existingOwner = await this.ownerRepository.findByEmail(contact.email);
		
		if (existingOwner) {
			return left(new EmailAlreadyExistsError(contact.email));
		}

		const owner = Owner.create({
			name,
			contact,
			propertiesIds
		});

		await this.ownerRepository.create(owner);

		return right({ owner });
	}
}