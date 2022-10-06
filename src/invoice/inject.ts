import { buildMakeInvoice } from "./domain/Invoice/invoice"
import { uuid } from "../common/id/uuid"
import { makeInvoiceLines } from "./domain"

export const fakeEnv = async () => Promise.resolve({ owner: "Leighton" })

export const makeDependencies = () => {
	const makeInvoice = buildMakeInvoice({ uuid, makeInvoiceLines })
}
