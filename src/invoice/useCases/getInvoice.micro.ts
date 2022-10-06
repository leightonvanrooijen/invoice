import { buildGetInvoice, GetInvoice } from "./getInvoice"
import { buildGetRepoInvoice } from "../repo/invoice/getRepoInvoice"
import { TestDB } from "../../common/db/testDB"
import { Invoice } from "../domain/Invoice/invoice"
import { fakeInvoice } from "../utils/fakeInvoice"
import { GetRepoProducts } from "../../product/repo/getRepoProducts"
import { fakeProduct } from "../utils/fakeProduct"
import { mapInvoiceFromSource } from "../repo/invoice/maps/mapInvoiceFromSource"

describe("getInvoice", () => {
	let dbInvoice: Invoice
	let getInvoice: GetInvoice
	beforeEach(() => {
		dbInvoice = fakeInvoice()
		const dbProducts = dbInvoice.invoiceLines.map((line) => fakeProduct({ id: line.productId }))
		const getRepoProducts: GetRepoProducts = async () => Promise.resolve(dbProducts)
		const db = new TestDB<Invoice>([dbInvoice], "id")
		const getRepoInvoice = buildGetRepoInvoice({ db, getRepoProducts, mapFromSource: mapInvoiceFromSource })

		getInvoice = buildGetInvoice({ getRepoInvoice })
	})

	it("returns an invoice", async () => {
		const invoice = await getInvoice(dbInvoice.id)

		expect(invoice.id).toEqual(dbInvoice.id)
	})
	it("returns an invoice with the products for each line", async () => {
		const invoice = await getInvoice(dbInvoice.id)

		expect(invoice.invoiceLines[0].product.id).toBeDefined()
	})
	it("requires an invoice ID", async () => {
		const invoice = async () => getInvoice("")

		await expect(invoice).rejects.toThrow()
	})
	it("requires the Invoice to exist", async () => {
		const invoice = async () => getInvoice("zxnknm")

		await expect(invoice).rejects.toThrow()
	})
})
