import { fakeInvoice } from "../../../utils/fakeInvoice"
import { removeInvoiceLine } from "./removeInvoiceLine"

describe("removeInvoiceLine", () => {
	it("removes an invoice line from the Invoice", () => {
		const invoice = fakeInvoice()
		const lineIdToRemove = invoice.invoiceLines[0].id

		const updatedInvoice = removeInvoiceLine(invoice, lineIdToRemove)
		const found = updatedInvoice.invoiceLines.some((line) => line.id === lineIdToRemove)
		expect(found).toBeFalsy()
	})

	it("requires the invoice line to exist on the invoice", () => {
		const invoice = fakeInvoice()

		const noLineInvoice = () => removeInvoiceLine(invoice, "xekmw")

		expect(noLineInvoice).toThrow()
	})
})
