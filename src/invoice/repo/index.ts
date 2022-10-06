import { buildGetRepoInvoice } from "./invoice/getRepoInvoice"
import { TestDB } from "../../common/db/testDB"
import { Invoice } from "../domain/Invoice/invoice"
import { buildCreateRepoInvoice } from "./invoice/createRepoInvoice"
import { buildGetRepoInvoiceProducts } from "./product/getRepoProducts"
import { getRepoProducts } from "../../product/repo"
import { mapInvoiceFromSource } from "./invoice/maps/mapInvoiceFromSource"
import { buildGetDomainInvoice } from "./invoice/getDomainInvoice"

const invoiceDb = new TestDB<Invoice>([], "id")

// TODO getRepoProducts should become the fetch the Products from the Product Service when split out
export const getRepoInvoiceProducts = buildGetRepoInvoiceProducts(getRepoProducts)

export const getRepoInvoice = buildGetRepoInvoice({
	db: invoiceDb,
	getRepoProducts: getRepoInvoiceProducts,
	mapFromSource: mapInvoiceFromSource,
})

export const createRepoInvoice = buildCreateRepoInvoice(invoiceDb)

export const getDomainInvoice = buildGetDomainInvoice({ db: invoiceDb })
