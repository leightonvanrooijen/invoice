import { fakeInvoice } from "../../../utils/fakeInvoice"
import { changeProductOnInvoiceLine } from "./changeProductOnInvoiceLine"

describe("changeProductForInvoiceLine", () => {
	it("changes the product ID on the specified Invoice Line", () => {
		const invoice = fakeInvoice()
		const productId = "xyz"
		const lineToUpdate = invoice.invoiceLines[1]

		const updatedInvoice = changeProductOnInvoiceLine(invoice, lineToUpdate.id, productId)

		expect(updatedInvoice.invoiceLines[1].productId).toEqual(productId)
	})
	it("requires the Invoice Line to exist on the Invoice", () => {
		const invoice = fakeInvoice()
		const productId = "xyz"

		const updatedInvoice = () => changeProductOnInvoiceLine(invoice, "xosz", productId)

		expect(updatedInvoice).toThrow()
	})
})
