import { Company } from '@/entities/company';
import { Contact } from '@/entities/contact';
import { ZipCodeInfo } from '@/entities/zipCodeInfo';
import { beforeEach, describe, expect, it } from 'vitest';
import { Address } from '@/entities/value-objects/address';
import { CreateCompanyUseCase } from '@/use-cases/create-company';
import { CompanyAlreadyExistsError } from '@/errors/company-already-exists-error';
import { InMemoryCompanyRepository } from 'test/repositories/in-memory-company-repository';

let sut: CreateCompanyUseCase;
let inMemoryCompanyRepository: InMemoryCompanyRepository;

describe('Create Company', () => {
    
	beforeEach(() => {
		inMemoryCompanyRepository = new InMemoryCompanyRepository();
		sut = new CreateCompanyUseCase(inMemoryCompanyRepository);
	});

	it('should create a Company', async () => {

		const companyName = 'Alles Imobiliária';

		const address = Address.create({
			complement: 'Sala 23',
			number: 1432,
			zipCodeInfo: ZipCodeInfo.create({
				zipCode: '89040-100',
				street: 'Rua XV',
				neighborhood: 'Centro',
				city: 'Blumenau',
				state: 'SC'
			})
		});

		const contact = Contact.create({
			telephone: '47 3390-3242',
			cellphone: '47 992-145-543',
			email: 'alles@imobtest.com'
		});
        
		const result = await sut.handle({
			name: companyName,
			address,
			contact,
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

	it('should\'t create a Company with same name', async () => {
        
		const companyName = 'Alles Imobiliária';

		const address = Address.create({
			complement: 'Sala 23',
			number: 1432,
			zipCodeInfo: ZipCodeInfo.create({
				zipCode: '89040-100',
				street: 'Rua XV',
				neighborhood: 'Centro',
				city: 'Blumenau',
				state: 'SC'
			})
		});

		const contact = Contact.create({
			telephone: '47 3390-3242',
			cellphone: '47 992-145-543',
			email: 'alles@imobtest.com'
		});
        
		inMemoryCompanyRepository.companies.push(Company.create({
			name: companyName,
			address,
			contact,
			agentsIds: [],
			propertiesIds: []
		}));
        
		const result = await sut.handle({
			name: companyName,
			address,
			contact,
			agentsIds: [],
			propertiesIds: []
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(CompanyAlreadyExistsError);
	});
});