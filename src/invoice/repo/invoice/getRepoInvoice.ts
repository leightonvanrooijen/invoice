import { Invoice, InvoiceStatus } from "../../domain/Invoice/invoice"
import { DataStore } from "../../../common/db/testDB"
import { Product } from "../../../product/domain/product"
import { GetRepoProducts } from "../../../product/repo/getRepoProducts"
import { MapFromSource } from "./maps/mapInvoiceFromSource"

export type RepoInvoiceLine = {
	id: string
	product: Product
	unitPrice: string
	quantity: number
	total: string
}

export type RepoInvoice = {
	id: string
	code: string
	status: InvoiceStatus
	invoiceLines: RepoInvoiceLine[]
}

export type GetRepoInvoice = (id: string) => Promise<RepoInvoice>
export type BuildGetRepoInvoiceInput = {
	db: DataStore<Invoice>
	getRepoProducts: GetRepoProducts
	mapFromSource: MapFromSource
}

export const buildGetRepoInvoice = ({
	db,
	getRepoProducts,
	mapFromSource,
}: BuildGetRepoInvoiceInput): GetRepoInvoice => {
	return async function getRepoInvoice(id) {
		const invoice = await db.get(id)
		if (!invoice) {
			throw new Error("Could not find a invoice matching the ID provided")
		}

		const productIds = invoice.invoiceLines.map((line) => line.productId)
		const products = await getRepoProducts(productIds)

		return mapFromSource(invoice, products)
	}
}
