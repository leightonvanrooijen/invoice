import { Invoice } from "../invoice"
import { makeInvoice } from "../../index"

export const pay = (invoice: Invoice): Invoice => {
	if (invoice.status === "Pending") {
		throw new Error("An invoice cannot go from Pending to Paid")
	}

	if (invoice.status === "Paid") {
		throw new Error("The invoice is already Paid")
	}

	return makeInvoice({ ...invoice, status: "Paid" })
}
