import { Invoice } from "../../domain/Invoice/invoice"
import { DataStore } from "../../../common/db/testDB"

export type CreateRepoInvoice = (invoice: Invoice) => Promise<Invoice>

export const buildCreateRepoInvoice = (db: DataStore<Invoice>): CreateRepoInvoice => {
	return async function createRepoInvoice(invoice) {
		const existingInvoice = await db.get(invoice.id)
		if (existingInvoice) {
			throw new Error("An Invoice already exists")
		}

		return await db.create(invoice)
	}
}
