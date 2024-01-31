import { Owner } from '@/entities/owner';

export interface OwnerRepository {
    
    create(owner: Owner): Promise<void>

    findByEmail(email: string): Promise<Owner | null>
}