import { fakeProductInput } from "../../invoice/utils/fakeProduct"
import { makeProduct } from "../../invoice/domain"

describe("makeProduct", () => {
	it("returns a Product", () => {
		const input = fakeProductInput()
		const product = makeProduct(input)

		expect(product.id).toEqual(input.id)
	})
	it("must have a ID", () => {
		const input = fakeProductInput({ id: "" })
		const productNoId = () => makeProduct(input)

		expect(productNoId).toThrow()
	})
	it("must have a name", () => {
		const input = fakeProductInput({ name: "" })
		const productNoName = () => makeProduct(input)

		expect(productNoName).toThrow()
	})
	it("must have a price above 0", () => {
		const input = fakeProductInput({ price: "0" })
		const productZeroCost = () => makeProduct(input)

		expect(productZeroCost).toThrow()
	})
})
