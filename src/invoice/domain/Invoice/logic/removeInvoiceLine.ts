import { Invoice } from "../invoice"
import { makeInvoice } from "../../index"

const invoiceLineDoesNotExist = (invoice: Invoice, invoiceLineId: string): boolean => {
	return !invoice.invoiceLines.some((line) => line.id === invoiceLineId)
}

export const removeInvoiceLine = (invoice: Invoice, invoiceLineId: string) => {
	if (invoiceLineDoesNotExist(invoice, invoiceLineId)) {
		throw new Error("There is no Invoice Line with the ID provided")
	}

	const updatedLines = invoice.invoiceLines.filter((line) => line.id !== invoiceLineId)

	return makeInvoice({ ...invoice, invoiceLines: updatedLines })
}
