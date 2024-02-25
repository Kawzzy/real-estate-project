import { Address } from '@/entities/address';
import { AddressRepository } from '@/repositories/address-repository';

export class InMemoryAddressRepository implements AddressRepository {
    
	public addresses: Address[] = [];

	async create(address: Address): Promise<void> {
		this.addresses.push(address);
	}
}