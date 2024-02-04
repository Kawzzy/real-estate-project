import { House } from '@/entities/house';
import { Hangar } from '@/entities/hangar';
import { describe, expect, it } from 'vitest';
import { ZipCodeInfo } from '@/entities/zipCodeInfo';
import { Address } from '@/entities/value-objects/address';
import { CommercialType } from '@/entities/enums/commercial-type';
import { PropertyStatus } from '@/entities/enums/property-status';
import { ResidentialType } from '@/entities/enums/residential-type';

describe('Create Properties', () => {

	it('should create a Residencial property', async () => {
		const address = Address.create({
			complement: '5th Avenue',
			number: 1922,
			zipCodeInfo: ZipCodeInfo.create({
				zipCode: '',
				street: '',
				neighborhood: '',
				city: '',
				state: ''
			})
		});
        
		const house = House.create({
			amenities: 8,
			areaSize: 112,
			backyard: true,
			builtYear: 2023,
			condominium: 'Key West',
			condominiumTax: 470,
			deck: true,
			description: 'Great house located in the lake area closed to pharmacy, school and groceries shops',
			driveWay: true,
			floors: 2,
			frontYard: true,
			furniture: true,
			imagesIds: [],
			ownerId: '1',
			porch: true,
			price: 2800,
			sponsorId: '1',
			status: PropertyStatus.FOR_RENT,
			type: ResidentialType.HOUSE,
			balcony: 3,
			airConditioner: 2,
			bathrooms: 4,
			bedrooms: 4,
			dinnerRoom: 1,
			elevator: 0,
			garage: 2,
			gym: false,
			heat: 2,
			kitchen: 1,
			laundry: 1,
			livingRoom: 1,
			playground: false,
			pool: 1,
			socialSpace: false,
			address,
			updatedAt: null
		});

		expect(house.status).toEqual(PropertyStatus.FOR_RENT);
	});

	it('should create a Commercial property', async () => {
		const address = Address.create({
			complement: '5th Avenue',
			number: 1922,
			zipCodeInfo: ZipCodeInfo.create({
				zipCode: '',
				street: '',
				neighborhood: '',
				city: '',
				state: ''
			})
		});
        
		const hangar = Hangar.create({
			areaSize: 112,
			builtYear: 2023,
			description: 'Giant hangar located in the industrial area',
			floors: 2,
			internetAccess: true,
			office: true,
			parkingLot: true,
			securitySystem: true,
			restRoom: 3,
			imagesIds: [],
			ownerId: '1',
			price: 2800,
			sponsorId: '1',
			status: PropertyStatus.FOR_BUY,
			type: CommercialType.HANGAR,
			address,
			updatedAt: null
		});

		expect(hangar.status).toEqual(PropertyStatus.FOR_BUY);
	});
});