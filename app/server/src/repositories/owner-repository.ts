import { Owner } from '@/entities/owner';
import { UserRepository } from './user-repository';

export interface OwnerRepository extends UserRepository<Owner> {}