import { changeProduct } from "./changeProduct"
import { fakeInvoiceLine } from "../../../utils/fakeInvoiceLine"
import { fakeProduct } from "../../../utils/fakeProduct"

describe("changeProduct", () => {
	it("changes a product ID to the Invoice Line", () => {
		const invoiceLine = fakeInvoiceLine()
		const product = fakeProduct()

		const updatedLine = changeProduct(invoiceLine, product.id)

		expect(updatedLine.productId).toEqual(product.id)
	})
	it("cannot add the same product ID that is on the Invoice Line", () => {
		const invoiceLine = fakeInvoiceLine()
		const sameProduct = invoiceLine.productId

		const updatedLine = () => changeProduct(invoiceLine, sameProduct)

		expect(updatedLine).toThrow()
	})
})
