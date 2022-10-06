import { TestDB } from "../../../common/db/testDB"
import { Invoice } from "../../domain/Invoice/invoice"
import { fakeInvoice } from "../../utils/fakeInvoice"
import { buildGetDomainInvoice, GetDomainInvoice } from "./getDomainInvoice"

describe("getDomainInvoice", () => {
	let dbInvoice: Invoice
	let getDomainInvoice: GetDomainInvoice
	beforeEach(() => {
		dbInvoice = fakeInvoice()
		getDomainInvoice = buildGetDomainInvoice({ db: new TestDB<Invoice>([dbInvoice], "id") })
	})

	it("returns an invoice matching the ID provided", async () => {
		const invoice = await getDomainInvoice(dbInvoice.id)

		expect(invoice.id).toEqual(dbInvoice.id)
	})
	it("requires the Invoice to exist in the datastore", async () => {
		const invoice = async () => getDomainInvoice("xjxk")

		await expect(invoice).rejects.toThrow()
	})
})
