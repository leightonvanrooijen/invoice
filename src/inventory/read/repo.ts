type ReadProduct = {
	id: string
	quantity: number
}

export const productReadRepo = () => {
	const db: any[] = []
	return {
		list() {
			return db
		},
		save(product: ReadProduct) {
			db.push(product)
		},
	}
}
