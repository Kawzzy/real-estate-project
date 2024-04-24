export interface PropertyRepository<P> {

    create(property: P): Promise<void>

    getAll(filterPage?: boolean): Promise<P[] | []>

    get(propertyId: string): Promise<P | null>

    delete(propertyId: string): Promise<void>
}