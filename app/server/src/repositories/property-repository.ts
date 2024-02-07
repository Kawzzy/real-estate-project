export interface PropertyRepository<P> {

    create(property: P): Promise<void>
}