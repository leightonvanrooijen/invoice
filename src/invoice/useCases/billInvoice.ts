import { bill } from "../domain/Invoice/logic/bill"
import { makeInvoice } from "../domain"
import { GetDomainInvoice } from "../repo/invoice/getDomainInvoice"
import { UpdateRepoInvoice } from "../repo/invoice/updateRepoInvoice"
import { Invoice } from "../domain/Invoice/invoice"

export type BillInvoice = (id: string) => Promise<Invoice>

export const buildBillInvoice = ({
	getDomainInvoice,
	updateRepoInvoice,
}: {
	getDomainInvoice: GetDomainInvoice
	updateRepoInvoice: UpdateRepoInvoice
}): BillInvoice => {
	return async function billInvoice(id) {
		if (!id) {
			throw new Error("Please provide an ID")
		}

		const repoInvoice = await getDomainInvoice(id)
		const invoice = makeInvoice(repoInvoice)

		const billedInvoice = bill(invoice)

		// TODO map products - play around with patterns
		return await updateRepoInvoice(billedInvoice)
	}
}
