import { inventoryRepo, productHandler } from "./inventory"

export const sellProduct = (id: string, quantity: number) => {
	const product = productHandler(id)
	product.sell(quantity)
	inventoryRepo().save(product)
}

export const receiveProduct = (id: string, quantity: number) => {
	const product = productHandler(id)
	product.receive(quantity)
	inventoryRepo().save(product)
}

export const adjustProduct = (id: string, quantity: number) => {
	const product = productHandler(id)
	product.adjust(quantity)
	inventoryRepo().save(product)
}
