import { CreateRepoInvoice } from "../repo/invoice/createRepoInvoice"
import { GetRepoProducts } from "../../product/repo/getRepoProducts"
import { Product } from "../../product/domain/product"
import { Invoice, MakeInvoice } from "../domain/Invoice/invoice"

export type CreateInvoiceLineInput = {
	productId: string
	unitPrice: string
	quantity: number
}

export type CreateInvoiceInput = {
	code: string
	invoiceLines: CreateInvoiceLineInput[]
}

export type BuildCreateInvoiceInput = {
	makeInvoice: MakeInvoice
	createRepoInvoice: CreateRepoInvoice
	getRepoProducts: GetRepoProducts
}

const getMissingProductIds = (products: Product[], productIds: string[]) => {
	const existingProductIds = products.map((product) => product.id)
	return productIds.filter((productId) => existingProductIds.includes(productId))
}

const findMissingProductIds = async (invoiceInput: CreateInvoiceInput, getRepoProducts: GetRepoProducts) => {
	const productIds = invoiceInput.invoiceLines.map((line) => line.productId)
	const products = await getRepoProducts(productIds)
	return getMissingProductIds(products, productIds)
}

export type CreateInvoice = (invoiceInput: CreateInvoiceInput) => Promise<Invoice>

export const buildCreateInvoice = ({
	makeInvoice,
	createRepoInvoice,
	getRepoProducts,
}: BuildCreateInvoiceInput): CreateInvoice => {
	return async function createInvoice(invoiceInput) {
		if (!invoiceInput.code) {
			throw new Error("Please enter a Invoice Code")
		}

		if (invoiceInput.invoiceLines.length === 0) {
			throw new Error("An Invoice must contain at least one Invoice Line")
		}

		const missingProductIds = await findMissingProductIds(invoiceInput, getRepoProducts)
		if (missingProductIds.length === 0) {
			throw new Error(`The following Product Ids have no matching Product: ${missingProductIds}`)
		}

		const invoice = makeInvoice({ ...invoiceInput, status: "Pending" })

		return await createRepoInvoice(invoice)
	}
}
