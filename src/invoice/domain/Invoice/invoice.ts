import { Uuid } from "../../../common/id/uuid"
import { InvoiceLine, InvoiceLineInput, MakeInvoiceLines } from "../InvoiceLine/invoiceLine"

export type InvoiceStatus = "Pending" | "Billed" | "Paid"

export type Invoice = {
	id: string
	code: string
	status: InvoiceStatus
	invoiceLines: InvoiceLine[]
}

export type InvoiceInput = {
	id?: string
	code: string
	status: InvoiceStatus
	invoiceLines: InvoiceLineInput[]
}

export type MakeInvoice = (invoiceInput: InvoiceInput) => Invoice
export const buildMakeInvoice = ({
	uuid,
	makeInvoiceLines,
}: {
	uuid: Uuid
	makeInvoiceLines: MakeInvoiceLines
}): MakeInvoice => {
	return function makeInvoice({ id, code, status, invoiceLines }) {
		if (!code) {
			throw new Error("An Invoice must have a code")
		}

		if (!status) {
			throw new Error("An Invoice must have a status")
		}

		if (invoiceLines.length < 1) {
			throw new Error("An invoice must have a invoice line")
		}

		return {
			id: id ?? uuid(),
			code,
			status,
			invoiceLines: makeInvoiceLines(invoiceLines),
		}
	}
}
