import { fakeInvoice } from "../../../utils/fakeInvoice"
import { updateInvoiceLine } from "./updateInvoiceLine"
import { fakeInvoiceLine } from "../../../utils/fakeInvoiceLine"

describe("updateInvoiceLine", () => {
	it("updates an invoice line from the Invoice", () => {
		const invoice = fakeInvoice()
		const invoiceLine = fakeInvoiceLine({ id: invoice.invoiceLines[0].id, quantity: 99999 })

		const updatedInvoice = updateInvoiceLine(invoice, invoiceLine)

		expect(updatedInvoice.invoiceLines[0].quantity).toEqual(99999)
	})

	it("requires the invoice line to exist on the invoice", () => {
		const invoice = fakeInvoice()
		const invoiceLine = fakeInvoiceLine()

		const noLineInvoice = () => updateInvoiceLine(invoice, invoiceLine)

		expect(noLineInvoice).toThrow()
	})
})
