import { fakeInvoiceLineInput } from "../../utils/fakeInvoiceLine"
import { buildMakeInvoiceLine } from "./invoiceLine"
import { num } from "../../../common/number/num"
import { makeInvoiceLine } from "../index"

describe("makeInvoiceLine", () => {
	it("returns an Invoice Line", () => {
		const input = fakeInvoiceLineInput()
		const invoice = makeInvoiceLine(input)

		expect(invoice.id).toBe(input.id)
	})
	it("calculates the total cost", () => {
		const input = fakeInvoiceLineInput({ quantity: 2, unitPrice: "5" })
		const invoice = makeInvoiceLine(input)

		expect(invoice.total).toBe("10")
	})
	it("generates an ID if one is not provided", () => {
		const input = fakeInvoiceLineInput({ id: undefined })
		const makeInvoice = buildMakeInvoiceLine({ uuid: () => "xyz", num })

		const invoice = makeInvoice(input)

		expect(invoice.id).toBe("xyz")
	})
	it("must have a Product", () => {
		const input = fakeInvoiceLineInput({ productId: undefined })
		const invoiceNoProduct = () => makeInvoiceLine(input)

		expect(invoiceNoProduct).toThrow()
	})
	it("must have a Quantity", () => {
		const input = fakeInvoiceLineInput({ productId: undefined })
		const invoiceNoProduct = () => makeInvoiceLine(input)

		expect(invoiceNoProduct).toThrow()
	})
})
