export interface UserRepository<T> {
    create(user: T): Promise<void>

    findByEmail(email: string): Promise<T | null>
}