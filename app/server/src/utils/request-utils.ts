import { ZipCodeInfo } from '@/entities/zipCodeInfo';

export interface IRequestBody {
	zipCodeInfo: ZipCodeInfo
}

export interface IPaginationParams {
	page: number
}