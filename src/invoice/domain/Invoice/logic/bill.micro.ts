import { fakeInvoice } from "../../../utils/fakeInvoice"
import { bill } from "./bill"

describe("bill", () => {
	it("Bills the Invoice from an Pending state", () => {
		const invoice = fakeInvoice({ status: "Pending" })

		const billed = bill(invoice)

		expect(billed.status).toBe("Billed")
	})
	it("cannot Bill an Invoice from Paid state", () => {
		const invoice = fakeInvoice({ status: "Paid" })

		const billed = () => bill(invoice)

		expect(billed).toThrow()
	})
	it("cannot Bill an Invoice if it is already Billed", () => {
		const invoice = fakeInvoice({ status: "Billed" })

		const billed = () => bill(invoice)

		expect(billed).toThrow()
	})
})
