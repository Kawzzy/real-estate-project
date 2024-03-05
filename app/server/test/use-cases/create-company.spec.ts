import { hash } from 'bcryptjs';
import { Address } from '@/entities/address';
import { Company } from '@/entities/company';
import { Contact } from '@/entities/contact';
import { ZipCodeInfo } from '@/entities/zipCodeInfo';
import { beforeEach, describe, expect, it } from 'vitest';
import { CreateCompanyUseCase } from '@/use-cases/create-company';
import { CompanyAlreadyExistsError } from '@/errors/company-already-exists-error';
import { InMemoryAddressRepository } from 'test/repositories/in-memory-address-repository';
import { InMemoryCompanyRepository } from 'test/repositories/in-memory-company-repository';
import { InMemoryContactRepository } from 'test/repositories/in-memory-contact-repository';

let sut: CreateCompanyUseCase;
let inMemoryContactRepository: InMemoryContactRepository;
let inMemoryAddressRepository: InMemoryAddressRepository;
let inMemoryCompanyRepository: InMemoryCompanyRepository;

describe('Create Company', () => {
    
	beforeEach(() => {
		inMemoryContactRepository = new InMemoryContactRepository();
		inMemoryAddressRepository = new InMemoryAddressRepository();
		inMemoryCompanyRepository = new InMemoryCompanyRepository(inMemoryContactRepository);
		sut = new CreateCompanyUseCase(inMemoryCompanyRepository, inMemoryContactRepository, inMemoryAddressRepository);
	});

	it('should create a Company', async () => {

		const companyName = 'Alles Imobiliária';
		const password = '12345678';
		const hashedPassword = await hash(password, 8);
        
		const zipCodeInfo = ZipCodeInfo.create({
			zipCode: '89040-100',
			street: 'Rua XV',
			neighborhood: 'Centro',
			city: 'Blumenau',
			state: 'SC'
		});

		const result = await sut.handle({
			name: companyName,
			password: hashedPassword,
			telephone: '47 3390-3242',
			cellphone: '47 992-145-543',
			email: 'alles@imobtest.com',
			zipCodeInfo,
			addressNumber: '1432',
			addressComplement: 'Sala 23',
			agentsIds: [],
			propertiesIds: []
		});

		expect(result.isRight()).toBe(true);
		expect(result.value).toEqual(
			expect.objectContaining({
				company: expect.objectContaining({
					id: expect.any(String)
				})
			}));
		expect(inMemoryCompanyRepository.companies).toHaveLength(1);
		expect(inMemoryCompanyRepository.companies[0].name).toEqual(companyName);
	});

	it('shouldn\'t create a Company with same name', async () => {
        
		const companyName = 'Alles Imobiliária';
		const zipCode = '89040-100';
		const addressNumber = '1432';
		const addressComplement = 'Sala 23';
		const telephone = '47 3390-3242';
		const cellphone = '47 992-145-543';
		const email = 'alles@imobtest.com';
		const password = '12345678';
		const hashedPassword = await hash(password, 8);

		const zipCodeInfo = ZipCodeInfo.create({
			zipCode,
			street: 'Rua XV',
			neighborhood: 'Centro',
			city: 'Blumenau',
			state: 'SC'
		});

		const address = Address.create({
			number: addressNumber,
			complement: addressComplement,
			zipCode: zipCodeInfo.zipCode
		});

		const contact = Contact.create({
			telephone,
			cellphone,
			email
		});
        
		inMemoryCompanyRepository.companies.push(Company.create({
			name: companyName,
			password: hashedPassword,
			addressId: address.id,
			contactId: contact.id,
			agentsIds: [],
			propertiesIds: []
		}));
        
		const result = await sut.handle({
			name: companyName,
			password: hashedPassword,
			telephone,
			cellphone,
			email,
			zipCodeInfo,
			addressNumber,
			addressComplement,
			agentsIds: [],
			propertiesIds: []
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(CompanyAlreadyExistsError);
	});
});