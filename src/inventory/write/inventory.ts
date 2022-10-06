import { Product, ProductAdjusted, ProductEvent, ProductReceived, ProductSold } from "./types"

export const productHandler = (id: string) => {
	const projection = {
		id,
		quantity: 0,
	}
	const events: ProductEvent[] = []

	const applySell = (event: ProductSold) => {
		projection.quantity -= event.quantity
	}
	const applyReceive = (event: ProductReceived) => {
		projection.quantity += event.quantity
	}
	const applyAdjust = (event: ProductAdjusted) => {
		projection.quantity += event.quantity
	}
	return {
		addEvent(event: ProductEvent) {
			switch (event.type) {
				case "ProductSold":
					applySell(event)
					break
				case "ProductAdjusted":
					applyAdjust(event)
					break
				case "ProductReceived":
					applyReceive(event)
					break
			}
			events.push(event)
		},
		sell(quantity: number) {
			const event: ProductSold = { id: projection.id, type: "ProductSold", quantity }
			this.addEvent(event)
			events.push(event)
		},
		receive(quantity: number) {
			const event: ProductReceived = { id: projection.id, type: "ProductReceived", quantity }
			this.addEvent(event)
			events.push(event)
		},
		adjust(quantity: number) {
			const event: ProductAdjusted = { id: projection.id, type: "ProductAdjusted", quantity }
			this.addEvent(event)
			events.push(event)
		},
		get id() {
			return projection.id
		},
		get events() {
			return events
		},
	}
}

export const inventoryRepo = () => {
	const eventStore: Record<string, ProductEvent[]> = {
		abc: [
			{ id: "abc", type: "ProductReceived", quantity: 10 },
			{ id: "abc", type: "ProductSold", quantity: 10 },
			{ id: "abc", type: "ProductReceived", quantity: 5 },
		],
	}
	return {
		get(id: string) {
			const product = productHandler(id)
			if (eventStore[id]) {
				eventStore[id].forEach(product.addEvent)
			}
			return product
		},
		save(product: Product) {
			eventStore[product.id] = product.events
		},
	}
}
