import { faker } from "@faker-js/faker"
import { InvoiceLine, InvoiceLineInput } from "../domain/InvoiceLine/invoiceLine"

export const fakeInvoiceLine = (overrides?: Partial<InvoiceLine>): InvoiceLine => {
	const invoiceLine: InvoiceLine = {
		id: faker.datatype.uuid(),
		productId: faker.datatype.uuid(),
		unitPrice: faker.finance.amount(),
		quantity: faker.datatype.number(),
		total: faker.finance.amount(),
	}

	return Object.freeze({
		...invoiceLine,
		...overrides,
	})
}

export const fakeInvoiceLineInput = (overrides?: Partial<InvoiceLineInput>): InvoiceLineInput => {
	const invoiceLine: InvoiceLineInput = {
		id: faker.datatype.uuid(),
		productId: faker.datatype.uuid(),
		unitPrice: faker.finance.amount(),
		quantity: faker.datatype.number(),
	}

	return Object.freeze({
		...invoiceLine,
		...overrides,
	})
}
