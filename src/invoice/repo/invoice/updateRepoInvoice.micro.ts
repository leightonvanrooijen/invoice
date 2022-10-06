import { TestDB } from "../../../common/db/testDB"
import { Invoice } from "../../domain/Invoice/invoice"
import { fakeInvoice } from "../../utils/fakeInvoice"
import { buildUpdateRepoInvoice } from "./updateRepoInvoice"

describe("updateRepoInvoice", () => {
	it("updates an invoice", async () => {
		const invoice = fakeInvoice()
		const db = new TestDB<Invoice>([invoice], "id")
		const invoiceUpdate = { ...invoice, code: "updated" }
		const updateInvoice = buildUpdateRepoInvoice(db)

		await updateInvoice(invoiceUpdate)
		const dbInvoice = await db.get(invoice.id)

		expect(dbInvoice?.code).toEqual(invoiceUpdate.code)
	})
	it("requires the Invoice to exist", async () => {
		const dbInvoice = fakeInvoice()
		const updateInvoice = buildUpdateRepoInvoice(new TestDB<Invoice>([], "id"))

		const invoice = async () => updateInvoice(dbInvoice)

		await expect(invoice).rejects.toThrow()
	})
})
