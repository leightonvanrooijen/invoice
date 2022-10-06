import { buildCreateInvoice, CreateInvoice } from "./createInvoice"
import { TestDB } from "../../common/db/testDB"
import { Invoice } from "../domain/Invoice/invoice"
import { buildCreateRepoInvoice } from "../repo/invoice/createRepoInvoice"
import { Product } from "../../product/domain/product"
import { buildGetRepoProducts } from "../../product/repo/getRepoProducts"
import { fakeInvoiceInput } from "../utils/fakeInvoice"
import { fakeProduct } from "../utils/fakeProduct"
import { fakeInvoiceLine, fakeInvoiceLineInput } from "../utils/fakeInvoiceLine"
import { makeInvoice } from "../domain"

describe("createInvoice", () => {
	let createInvoice: CreateInvoice
	let invoiceDb: TestDB<Invoice>
	let productDb: TestDB<Product>
	beforeEach(() => {
		invoiceDb = new TestDB<Invoice>([], "id")
		productDb = new TestDB<Product>([], "id")
		createInvoice = buildCreateInvoice({
			makeInvoice,
			createRepoInvoice: buildCreateRepoInvoice(invoiceDb),
			getRepoProducts: buildGetRepoProducts(productDb),
		})
	})

	it("returns an Pending Invoice", async () => {
		const product = fakeProduct()
		await productDb.create(product)
		const invoiceInput = fakeInvoiceInput({ invoiceLines: [fakeInvoiceLineInput({ productId: product.id })] })

		const invoice = await createInvoice(invoiceInput)

		expect(invoice.status).toEqual("Pending")
	})
	it("requires the Invoice to have at least one Invoice Line", async () => {
		const invoiceInput = fakeInvoiceInput({ invoiceLines: [] })

		const invoice = async () => createInvoice(invoiceInput)

		await expect(invoice).rejects.toThrow()
	})
	it("requires the Invoice to have a code", async () => {
		const product = fakeProduct()
		await productDb.create(product)
		const invoiceInput = fakeInvoiceInput({ code: "", invoiceLines: [fakeInvoiceLine({ productId: product.id })] })

		const invoice = async () => createInvoice(invoiceInput)

		await expect(invoice).rejects.toThrow()
	})
	it("requires all Products on invoice lines to exist", async () => {
		const invoiceInput = fakeInvoiceInput()

		const invoice = async () => createInvoice(invoiceInput)

		await expect(invoice).rejects.toThrow()
	})
})
