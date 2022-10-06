import { fakeInvoice } from "../../../utils/fakeInvoice"
import { fakeInvoiceLine } from "../../../utils/fakeInvoiceLine"
import { addInvoiceLine } from "./addInvoiceLine"

describe("addInvoiceLine", () => {
	it("adds an invoice line to the Invoice", () => {
		const invoice = fakeInvoice()
		const invoiceLine = fakeInvoiceLine()

		const updatedInvoice = addInvoiceLine(invoice, invoiceLine)
		const found = updatedInvoice.invoiceLines.some((line) => line.productId === invoiceLine.productId)

		expect(found).toBeTruthy()
	})

	it("will not add a invoice line if a line already exists with the product Id", () => {
		const invoice = fakeInvoice()

		const updatedInvoice = () => addInvoiceLine(invoice, invoice.invoiceLines[0])

		expect(updatedInvoice).toThrow()
	})
})
