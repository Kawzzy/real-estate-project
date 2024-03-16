import { Owner } from '@/entities/owner';
import { Contact } from '@/entities/contact';
import { describe, beforeEach, it, expect } from 'vitest';
import { FakeHasher } from 'test/infra/cryptography/fake-hasher';
import { FakeEncrypter } from 'test/infra/cryptography/fake-encrypter';
import { AuthenticateOwnerUseCase } from '@/use-cases/authenticate-owner';
import { InMemoryOwnerRepository } from 'test/repositories/in-memory-owner-repository';
import { InMemoryContactRepository } from 'test/repositories/in-memory-contact-repository';

let sut: AuthenticateOwnerUseCase;
let inMemoryContactRepository: InMemoryContactRepository;
let inMemoryOwnerRepository: InMemoryOwnerRepository;
let fakeHasher: FakeHasher;
let fakeEncrypter: FakeEncrypter;

describe('Authenticate Owner', () => {

	beforeEach(() => {
		inMemoryContactRepository = new InMemoryContactRepository();
		inMemoryOwnerRepository = new InMemoryOwnerRepository(inMemoryContactRepository);
		fakeHasher = new FakeHasher();
		fakeEncrypter = new FakeEncrypter();
		sut = new AuthenticateOwnerUseCase(inMemoryOwnerRepository, fakeHasher, fakeEncrypter);
	});

	it('should authenticate an Owner', async () => {

		const ownerName = 'John Doe';
		const ownerCellphone = '47 992-145-543';
		const ownerEmail = 'owner@test.com';
		const password = '87654321';

		const contact = Contact.create({
			cellphone: ownerCellphone,
			email: ownerEmail,
		});
		
		inMemoryContactRepository.contacts.push(contact);
        
		const owner = Owner.create({
			name: ownerName,
			password: await fakeHasher.hash(password),
			contactId: contact.id,
			propertiesIds: []
		});

		inMemoryOwnerRepository.owners.push(owner);
        
		const result = await sut.handle({
			email: ownerEmail,
			password
		});

		expect(result.isRight()).toBe(true);
		expect(result.value).toEqual({
			accessToken: expect.any(String)
		});
		expect(inMemoryOwnerRepository.owners).toHaveLength(1);
		expect(inMemoryOwnerRepository.owners[0].name).toEqual(ownerName);
	});
});