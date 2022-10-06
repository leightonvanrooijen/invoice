import { Invoice, InvoiceInput, InvoiceStatus } from "../domain/Invoice/invoice"
import { faker } from "@faker-js/faker"
import { fakeInvoiceLine, fakeInvoiceLineInput } from "./fakeInvoiceLine"

const STATUSES: InvoiceStatus[] = ["Pending", "Billed", "Paid"]

export const fakeInvoice = (overrides?: Partial<Invoice>): Invoice => {
	const invoice: Invoice = {
		id: faker.datatype.uuid(),
		code: faker.random.word(),
		status: faker.helpers.arrayElement(STATUSES),
		invoiceLines: [fakeInvoiceLine(), fakeInvoiceLine(), fakeInvoiceLine()],
	}

	return Object.freeze({
		...invoice,
		...overrides,
	})
}

export const fakeInvoiceInput = (overrides?: Partial<InvoiceInput>) => {
	const invoice: InvoiceInput = {
		id: faker.datatype.uuid(),
		code: faker.random.word(),
		status: faker.helpers.arrayElement(STATUSES),
		invoiceLines: [fakeInvoiceLineInput()],
	}

	return Object.freeze({
		...invoice,
		...overrides,
	})
}
