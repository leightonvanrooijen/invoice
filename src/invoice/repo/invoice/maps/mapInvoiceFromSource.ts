import { Invoice } from "../../../domain/Invoice/invoice"
import { Product } from "../../../../product/domain/product"
import { InvoiceLine } from "../../../domain/InvoiceLine/invoiceLine"
import { RepoInvoice, RepoInvoiceLine } from "../getRepoInvoice"

export type MapFromSource = (invoice: Invoice, products: Product[]) => RepoInvoice
const mapInvoiceLines = (invoiceLines: InvoiceLine[], products: Product[]): RepoInvoiceLine[] => {
	return invoiceLines.map((invoiceLine) => {
		const product = products.find((product) => product.id === invoiceLine.productId)
		if (!product) {
			throw new Error("How to handle this case?")
		}
		return {
			id: invoiceLine.id,
			product,
			unitPrice: invoiceLine.unitPrice,
			quantity: invoiceLine.quantity,
			total: invoiceLine.total,
		}
	})
}
export const mapInvoiceFromSource: MapFromSource = (invoice, products) => {
	return {
		...invoice,
		invoiceLines: mapInvoiceLines(invoice.invoiceLines, products),
	}
}

export const passThrough = (invoice: Invoice) => invoice
