import { Invoice } from "../invoice"
import { makeInvoice } from "../../index"

export const bill = (invoice: Invoice): Invoice => {
	if (invoice.status === "Paid") {
		throw new Error("The invoice cannot be Billed from a Paid State")
	}

	if (invoice.status === "Billed") {
		throw new Error("The invoice is already Billed")
	}

	return makeInvoice({ ...invoice, status: "Billed" })
}
