import { fakeInvoice } from "../../../utils/fakeInvoice"
import { pay } from "./pay"

describe("paid", () => {
	it("Paid the Invoice from an Billed state", () => {
		const invoice = fakeInvoice({ status: "Billed" })

		const paid = pay(invoice)

		expect(paid.status).toBe("Paid")
	})
	it("cannot Pay an Invoice from Pending state", () => {
		const invoice = fakeInvoice({ status: "Pending" })

		const paid = () => pay(invoice)

		expect(paid).toThrow()
	})
	it("cannot Pay an Invoice if it is already Paid", () => {
		const invoice = fakeInvoice({ status: "Paid" })

		const paid = () => pay(invoice)

		expect(paid).toThrow()
	})
})
