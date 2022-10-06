import { DataStore } from "../../../common/db/testDB"
import { Invoice } from "../../domain/Invoice/invoice"

export type GetDomainInvoice = (id: string) => Promise<Invoice>
export type BuildGetInvoiceInput = { db: DataStore<Invoice> }

export const buildGetDomainInvoice = ({ db }: BuildGetInvoiceInput): GetDomainInvoice => {
	return async function getDomainInvoice(id) {
		const invoice = await db.get(id)
		if (!invoice) {
			throw new Error("Could not find a invoice matching the ID provided")
		}

		return invoice
	}
}
