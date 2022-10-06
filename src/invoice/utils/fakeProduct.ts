import { faker } from "@faker-js/faker"
import { Product, ProductInput } from "../../product/domain/product"

export const fakeProduct = (overrides?: Partial<Product>): Product => {
	const product: Product = {
		id: faker.datatype.uuid(),
		name: faker.commerce.productName(),
		price: faker.finance.amount(),
	}

	return Object.freeze({
		...product,
		...overrides,
	})
}

export const fakeProductInput = (overrides?: Partial<ProductInput>) => fakeProduct(overrides)
