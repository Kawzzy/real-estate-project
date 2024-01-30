import { ZipCodeInfo } from '@/entities/zipCodeInfo';

export interface ZipCodeInfoRepository {
    
    create(zipCodeInfo: ZipCodeInfo): Promise<void>

    findByZipCode(zipCode: string): Promise<ZipCodeInfo | null>

    delete(zipCode: string): Promise<void>
}