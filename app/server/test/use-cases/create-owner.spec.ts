import { Owner } from '@/entities/owner';
import { Contact } from '@/entities/contact';
import { beforeEach, describe, expect, it } from 'vitest';
import { CreateOwnerUseCase } from '@/use-cases/create-owner';
import { FakeHasher } from 'test/infra/cryptography/fake-hasher';
import { EmailAlreadyExistsError } from '@/errors/email-already-exists-error';
import { InMemoryOwnerRepository } from 'test/repositories/in-memory-owner-repository';
import { InMemoryContactRepository } from 'test/repositories/in-memory-contact-repository';

let sut: CreateOwnerUseCase;
let inMemoryContactRepository: InMemoryContactRepository;
let inMemoryOwnerRepository: InMemoryOwnerRepository;
let fakeHasher: FakeHasher;

describe('Create Owner', () => {
	
	beforeEach(() => {
		inMemoryContactRepository = new InMemoryContactRepository();
		inMemoryOwnerRepository = new InMemoryOwnerRepository(inMemoryContactRepository);
		fakeHasher = new FakeHasher();
		sut = new CreateOwnerUseCase(inMemoryContactRepository, inMemoryOwnerRepository, fakeHasher);
	});

	it('should create an Owner', async () => {

		const ownerName = 'John Doe';
		const password = '12345678';
        
		const result = await sut.handle({
			name: ownerName,
			password,
			cellphone: '47 992-145-543',
			email: 'owner@test.com',
			propertiesIds: []
		});
		
		expect(inMemoryContactRepository.contacts).toHaveLength(1);
		
		const contactId = inMemoryContactRepository.contacts[0].id;
		
		const hashedPassword = await fakeHasher.hash(password);
		
		expect(result.isRight()).toBe(true);
		expect(result.value).toEqual(
			expect.objectContaining({
				owner: expect.objectContaining({
					contactId
				})
			})
		);
		expect(inMemoryOwnerRepository.owners).toHaveLength(1);
		expect(inMemoryOwnerRepository.owners[0].name).toEqual(ownerName);
		expect(inMemoryOwnerRepository.owners[0].password).toEqual(hashedPassword);
	});

	it('shouldn\'t create an Owner with same email', async () => {

		const cellphone = '47 992-145-543';
		const email = 'owner@test.com';
		const password = '87654321';

		const contact = Contact.create({
			cellphone,
			email
		});

		inMemoryContactRepository.contacts.push(contact);
		
		inMemoryOwnerRepository.owners.push(Owner.create({
			name: 'Eminem',
			password,
			contactId: contact.id,
			propertiesIds: []
		}));
		
		const result = await sut.handle({
			name: 'John Doe',
			password,
			cellphone,
			email,
			propertiesIds: []
		});
		
		expect(result.isLeft()).toBe(true);
		expect(inMemoryContactRepository.contacts).toHaveLength(1);
		expect(result.value).toBeInstanceOf(EmailAlreadyExistsError);
	});
});