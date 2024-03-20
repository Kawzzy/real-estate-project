import { Address } from '@/entities/address';
import { Company } from '@/entities/company';
import { Contact } from '@/entities/contact';
import { FakeHasher } from 'test/infra/cryptography/fake-hasher';
import { FakeEncrypter } from 'test/infra/cryptography/fake-encrypter';
import { AuthenticateCompanyUseCase } from '@/use-cases/authenticate-company';
import { InMemoryAddressRepository } from 'test/repositories/in-memory-address-repository';
import { InMemoryCompanyRepository } from 'test/repositories/in-memory-company-repository';
import { InMemoryContactRepository } from 'test/repositories/in-memory-contact-repository';


let sut: AuthenticateCompanyUseCase;
let inMemoryContactRepository: InMemoryContactRepository;
let inMemoryCompanyRepository: InMemoryCompanyRepository;
let inMemoryAddressRepository: InMemoryAddressRepository;
let fakeHasher: FakeHasher;
let fakeEncrypter: FakeEncrypter;

describe('Authenticate Company', () => {

	beforeEach(() => {
		inMemoryContactRepository = new InMemoryContactRepository();
		inMemoryCompanyRepository = new InMemoryCompanyRepository(inMemoryContactRepository);
		inMemoryAddressRepository = new InMemoryAddressRepository();
		fakeHasher = new FakeHasher();
		fakeEncrypter = new FakeEncrypter();
		sut = new AuthenticateCompanyUseCase(inMemoryCompanyRepository, fakeHasher, fakeEncrypter);
	});

	it('should authenticate a Company', async () => {

		const companyName = 'Alles imoveis';
		const companyCellphone = '(47) 992-145-543';
		const companyEmail = 'alles@imoveis.com';
		const password = 'r234235';

		const contact = Contact.create({
			cellphone: companyCellphone,
			email: companyEmail,
		});
		
		inMemoryContactRepository.contacts.push(contact);
        
		const address = Address.create({
			zipCode: '89120000',
			number: '32',
			complement: 'Comercial building, 3rd room'
		});

		inMemoryAddressRepository.addresses.push(address);

		const company = Company.create({
			name: companyName,
			password: await fakeHasher.hash(password),
			contactId: contact.id,
			addressId: address.id,
			agentsIds: [],
			propertiesIds: []
		});

		inMemoryCompanyRepository.companies.push(company);
        
		const result = await sut.handle({
			email: companyEmail,
			password
		});

		expect(result.isRight()).toBe(true);
		expect(result.value).toEqual({
			accessToken: expect.any(String)
		});
		expect(inMemoryCompanyRepository.companies).toHaveLength(1);
		expect(inMemoryCompanyRepository.companies[0].name).toEqual(companyName);
	});
});