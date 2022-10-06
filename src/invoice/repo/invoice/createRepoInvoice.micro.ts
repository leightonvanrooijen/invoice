import { TestDB } from "../../../common/db/testDB"
import { Invoice } from "../../domain/Invoice/invoice"
import { fakeInvoice } from "../../utils/fakeInvoice"
import { buildCreateRepoInvoice } from "./createRepoInvoice"

describe("createsInvoice", () => {
	it("creates an invoice", async () => {
		const invoice = fakeInvoice()
		const db = new TestDB<Invoice>([], "id")
		const createInvoice = buildCreateRepoInvoice(db)

		await createInvoice(invoice)
		const dbInvoice = await db.get(invoice.id)

		expect(dbInvoice?.id).toEqual(invoice.id)
	})
	it("requires the Invoice to NOT exist already", async () => {
		const dbInvoice = fakeInvoice()
		const createInvoice = buildCreateRepoInvoice(new TestDB<Invoice>([dbInvoice], "id"))

		const invoice = async () => createInvoice(dbInvoice)

		await expect(invoice).rejects.toThrow()
	})
})
