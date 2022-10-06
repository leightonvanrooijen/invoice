import { InvoiceLine } from "../invoiceLine"
import { makeInvoiceLine } from "../../index"

const productIsAlreadyOnInvoiceLine = (invoiceLine: InvoiceLine, productId: string) =>
	invoiceLine.productId === productId

export const changeProduct = (invoiceLine: InvoiceLine, productId: string) => {
	if (productIsAlreadyOnInvoiceLine(invoiceLine, productId)) {
		throw new Error("The product you are trying to add is already on the Invoice Line")
	}

	return makeInvoiceLine({ ...invoiceLine, productId })
}
