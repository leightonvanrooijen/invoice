import { Invoice } from "../invoice"
import { changeProduct } from "../../InvoiceLine/logic/changeProduct"
import { updateInvoiceLine } from "./updateInvoiceLine"

const findInvoiceLine = (invoice: Invoice, invoiceLineId: string) => {
	const invoiceLineArray = invoice.invoiceLines.filter((line) => line.id === invoiceLineId)
	if (invoiceLineArray.length === 0) {
		throw new Error("The Invoice does not contain the Invoice Line you are trying to update")
	}

	return invoiceLineArray[0]
}

export const changeProductOnInvoiceLine = (invoice: Invoice, invoiceLineId: string, productId: string) => {
	const lineToUpdate = findInvoiceLine(invoice, invoiceLineId)
	const updatedLine = changeProduct(lineToUpdate, productId)

	return updateInvoiceLine(invoice, updatedLine)
}
