import { Invoice } from "../invoice"
import { InvoiceLine } from "../../InvoiceLine/invoiceLine"
import { makeInvoice } from "../../index"

const invoiceLineNotFound = (invoice: Invoice, invoiceLine: InvoiceLine) => {
	const index = invoice.invoiceLines.findIndex((line) => line.id === invoiceLine.id)
	return index === -1
}

const isLineToUpdate = (invoiceLine: InvoiceLine, invoiceLineUpdate: InvoiceLine) =>
	invoiceLine.id === invoiceLineUpdate.id

export const updateInvoiceLine = (invoice: Invoice, invoiceLineUpdate: InvoiceLine) => {
	if (invoiceLineNotFound(invoice, invoiceLineUpdate)) {
		throw new Error("The Invoice does not contain the Invoice Line you are trying to update")
	}

	const invoiceLines = invoice.invoiceLines.map((invoiceLine) => {
		if (isLineToUpdate(invoiceLine, invoiceLineUpdate)) {
			return invoiceLineUpdate
		}
		return invoiceLine
	})

	return makeInvoice({ ...invoice, invoiceLines })
}
