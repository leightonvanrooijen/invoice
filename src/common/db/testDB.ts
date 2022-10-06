export interface DataStore<T extends Record<string, any>> {
	get(keyValue: string): Promise<T | undefined>

	getByIds(keyValues: string[]): Promise<T[]>

	getAll(): Promise<T[]>

	create(inputItem: T): Promise<T>

	delete(keyValue: string): Promise<any>

	update(inputItem: T): Promise<T>
}

export class TestDB<T extends Record<string, any>> implements DataStore<T> {
	constructor(private store: T[], private key: keyof T) {}

	async get(keyValue: string): Promise<T | undefined> {
		const item = this.store.find((item) => item[this.key] === keyValue)
		return Promise.resolve(item)
	}

	async getByIds(keyValues: string[]): Promise<T[]> {
		const items = this.store.filter((item) => keyValues.includes(item[this.key]))
		return Promise.resolve(items)
	}

	async getAll(): Promise<T[]> {
		return Promise.resolve(this.store)
	}

	async create(inputItem: T): Promise<T> {
		const key = inputItem[this.key]
		const keeping = this.store.filter((item) => item[this.key] !== key)
		keeping.push(inputItem)
		this.store = keeping
		return Promise.resolve(inputItem)
	}

	async delete(keyValue: string): Promise<void> {
		this.store = this.store.filter((item) => item[this.key] !== keyValue)
		return Promise.resolve()
	}

	async update(update: T) {
		// For now this overwrites the entire object in the database
		return Promise.resolve(await this.create(update))
	}
}
