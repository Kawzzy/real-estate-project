import { Owner } from '@/entities/owner';
import { beforeEach, describe, expect, it } from 'vitest';
import { Contact } from '@/entities/value-objects/contact';
import { CreateOwnerUseCase } from '@/use-cases/create-owner';
import { EmailAlreadyExistsError } from '@/errors/email-already-exists-error';
import { InMemoryOwnerRepository } from 'test/repositories/in-memory-owner-repository';

let sut: CreateOwnerUseCase;
let inMemoryOwnerRepository: InMemoryOwnerRepository;

describe('Create Owner', () => {

	beforeEach(() => {
		inMemoryOwnerRepository = new InMemoryOwnerRepository();
		sut = new CreateOwnerUseCase(inMemoryOwnerRepository);
	});

	it('should create an Owner', async () => {

		const ownerName = 'John Doe';
		const ownerEmail = 'owner@test.com';
        
		const contact = Contact.create({
			cellphone: '47 992-145-543',
			email: ownerEmail
		});
        
		const result = await sut.handle({
			name: ownerName,
			contact,
			propertiesIds: []
		});

		expect(result.isRight()).toBe(true);
		expect(result.value).toEqual(
			expect.objectContaining({
				owner: expect.objectContaining({
					contact: expect.objectContaining({
						email: ownerEmail
					})
				})
			})
		);
		expect(inMemoryOwnerRepository.owners).toHaveLength(1);
		expect(inMemoryOwnerRepository.owners[0].name).toEqual(ownerName);
	});

	it('shouldn\'t create an Owner with same email', async () => {

		const contact = Contact.create({
			cellphone: '47 992-145-543',
			email: 'owner@test.com'
		});

		inMemoryOwnerRepository.owners.push(Owner.create({
			name: 'Eminem',
			contact,
			propertiesIds: []
		}));
		
		const result = await sut.handle({
			name: 'John Doe',
			contact,
			propertiesIds: []
		});
		
		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(EmailAlreadyExistsError);
	});
});