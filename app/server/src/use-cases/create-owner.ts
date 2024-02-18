import { Owner } from '@/entities/owner';
import { Contact } from '@/entities/contact';
import { Either, left, right } from '@/utils/either';
import { OwnerRepository } from '@/repositories/owner-repository';
import { ContactRepository } from '@/repositories/contact-repository';
import { EmailAlreadyExistsError } from '@/errors/email-already-exists-error';

interface CreateOwnerUseCaseRequest {
    name: string
	telephone?: string
	cellphone: string
	email: string
    propertiesIds: string[]
}

type CreateOwnerUseCaseResponse = Either<EmailAlreadyExistsError, { owner: Owner }>

export class CreateOwnerUseCase {

	constructor(
		private contactRepository: ContactRepository,
		private ownerRepository: OwnerRepository
	) {}

	async handle({ name, telephone, cellphone, email, propertiesIds }: CreateOwnerUseCaseRequest): Promise<CreateOwnerUseCaseResponse> {

		const existingOwner = await this.ownerRepository.findByEmail(email);
		
		if (existingOwner) {
			return left(new EmailAlreadyExistsError(email));
		}

		const contact = Contact.create({
			telephone,
			cellphone,
			email
		});

		await this.contactRepository.create(contact);
		
		const owner = Owner.create({
			name,
			contactId: contact.id,
			propertiesIds
		});

		await this.ownerRepository.create(owner);

		return right({ owner });
	}
}