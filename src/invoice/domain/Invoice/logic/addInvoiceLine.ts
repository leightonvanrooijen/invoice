import { Invoice } from "../invoice"
import { InvoiceLine } from "../../InvoiceLine/invoiceLine"
import { makeInvoice } from "../../index"

const invoiceHasLineWithProduct = (invoice: Invoice, productId: string): boolean => {
	return invoice.invoiceLines.some((line) => line.productId === productId)
}

export const addInvoiceLine = (invoice: Invoice, invoiceLine: InvoiceLine) => {
	if (invoiceHasLineWithProduct(invoice, invoiceLine.productId)) {
		throw new Error("There is already a line containing the product ID")
	}

	return makeInvoice({ ...invoice, invoiceLines: [...invoice.invoiceLines, invoiceLine] })
}
