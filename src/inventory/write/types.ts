export type ProductSold = {
	id: string
	type: "ProductSold"
	quantity: number
}
export type ProductReceived = {
	id: string
	type: "ProductReceived"
	quantity: number
}
export type ProductAdjusted = {
	id: string
	type: "ProductAdjusted"
	quantity: number
}
export type ProductEvent = ProductSold | ProductAdjusted | ProductReceived

export type Product = {
	id: string
	events: ProductEvent[]
	addEvent: (event: ProductEvent) => void
}
