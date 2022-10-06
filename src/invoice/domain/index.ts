import { uuid } from "../../common/id/uuid"
import { buildMakeInvoice } from "./Invoice/invoice"
import { num } from "../../common/number/num"
import { buildMakeInvoiceLine, InvoiceLineInput, MakeInvoiceLines } from "./InvoiceLine/invoiceLine"
import { buildMakeProduct } from "../../product/domain/product"

export const makeProduct = buildMakeProduct({ num })

export const makeInvoiceLine = buildMakeInvoiceLine({ uuid, num })
export const makeInvoiceLines: MakeInvoiceLines = (invoiceLines: InvoiceLineInput[]) =>
	invoiceLines.map(makeInvoiceLine)

export const makeInvoice = buildMakeInvoice({ uuid, makeInvoiceLines })
