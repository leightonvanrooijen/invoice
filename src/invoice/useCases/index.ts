import { buildGetInvoice } from "./getInvoice"
import { createRepoInvoice, getRepoInvoice, getRepoInvoiceProducts } from "../repo"
import { buildCreateInvoice } from "./createInvoice"
import { makeInvoice } from "../domain"

export const InvoiceDependencies = () => {}
export const getInvoice = buildGetInvoice({ getRepoInvoice })
export const createInvoice = buildCreateInvoice({
	makeInvoice,
	createRepoInvoice,
	getRepoProducts: getRepoInvoiceProducts,
})
