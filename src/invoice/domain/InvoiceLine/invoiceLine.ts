import { Num } from "../../../common/number/num"
import { Uuid } from "../../../common/id/uuid"

export type InvoiceLine = {
	id: string
	productId: string
	unitPrice: string
	quantity: number
	total: string
}

export type InvoiceLineInput = {
	id?: string
	productId: string
	unitPrice: string
	quantity: number
}

export type MakeInvoiceLine = ({ id, productId, quantity }: InvoiceLineInput) => InvoiceLine
export type MakeInvoiceLines = (invoiceLines: InvoiceLineInput[]) => InvoiceLine[]

export const buildMakeInvoiceLine = ({ uuid, num }: { uuid: Uuid; num: Num }): MakeInvoiceLine => {
	return function makeInvoiceLine({ id, unitPrice, productId, quantity }) {
		if (!productId) {
			throw new Error("A Invoice Line must contain a Product")
		}

		if (quantity <= 0) {
			throw new Error("A Invoice Line must have a quantity above 0")
		}

		const total = num(unitPrice).multipliedBy(quantity).toFormat()

		return Object.freeze({
			id: id ?? uuid(),
			productId,
			unitPrice,
			quantity,
			total,
		})
	}
}
