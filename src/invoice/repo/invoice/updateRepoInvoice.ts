import { Invoice } from "../../domain/Invoice/invoice"
import { DataStore } from "../../../common/db/testDB"

export type UpdateRepoInvoice = (invoice: Invoice) => Promise<Invoice>

export const buildUpdateRepoInvoice = (db: DataStore<Invoice>): UpdateRepoInvoice => {
	return async function updateRepoInvoice(invoice) {
		const existingInvoice = await db.get(invoice.id)
		if (!existingInvoice) {
			throw new Error("The Invoice does not exist")
		}

		return await db.update(invoice)
	}
}
