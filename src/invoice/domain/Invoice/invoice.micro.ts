import { fakeInvoiceInput } from "../../utils/fakeInvoice"
import { makeInvoice } from "../index"

describe("makeInvoice", () => {
	it("returns an invoice", () => {
		const input = fakeInvoiceInput()
		const invoice = makeInvoice(input)

		expect(invoice.id).toEqual(input.id)
	})
	it("creates an ID if one is not provided", () => {
		const input = fakeInvoiceInput({ id: "" })
		const invoice = makeInvoice(input)

		expect(invoice.id).toEqual(input.id)
	})
	it("must have a code", () => {
		const input = fakeInvoiceInput({ code: "" })
		const invoiceNoCode = () => makeInvoice(input)

		expect(invoiceNoCode).toThrow()
	})
	it("must have a status", () => {
		const input = fakeInvoiceInput({ status: undefined })
		const invoiceNoStatus = () => makeInvoice(input)

		expect(invoiceNoStatus).toThrow()
	})
	it("must have at least one invoice line", () => {
		const input = fakeInvoiceInput({ invoiceLines: [] })
		const invoiceNoLines = () => makeInvoice(input)

		expect(invoiceNoLines).toThrow()
	})
})
