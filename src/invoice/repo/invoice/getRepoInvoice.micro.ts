import { TestDB } from "../../../common/db/testDB"
import { Invoice } from "../../domain/Invoice/invoice"
import { buildGetRepoInvoice, GetRepoInvoice } from "./getRepoInvoice"
import { fakeInvoice } from "../../utils/fakeInvoice"
import { fakeProduct } from "../../utils/fakeProduct"
import { GetRepoProducts } from "../../../product/repo/getRepoProducts"
import { mapInvoiceFromSource } from "./maps/mapInvoiceFromSource"

describe("getRepoInvoice", () => {
	let dbInvoice: Invoice
	let getRepoInvoice: GetRepoInvoice
	beforeEach(() => {
		dbInvoice = fakeInvoice()
		const dbProducts = dbInvoice.invoiceLines.map((line) => fakeProduct({ id: line.productId }))
		const getRepoProducts: GetRepoProducts = async () => Promise.resolve(dbProducts)
		const db = new TestDB<Invoice>([dbInvoice], "id")

		getRepoInvoice = buildGetRepoInvoice({ db, getRepoProducts, mapFromSource: mapInvoiceFromSource })
	})

	it("returns an invoice matching the ID provided", async () => {
		const invoice = await getRepoInvoice(dbInvoice.id)

		expect(invoice.id).toEqual(dbInvoice.id)
	})
	it("includes the Products from each Invoice Line", async () => {
		const invoice = await getRepoInvoice(dbInvoice.id)

		expect(invoice.invoiceLines[0].product.id).toEqual(dbInvoice.invoiceLines[0].productId)
	})
	it("requires the Invoice to exist in the datastore", async () => {
		const invoice = async () => getRepoInvoice("xjxk")

		await expect(invoice).rejects.toThrow()
	})
})
