import { CreateInvoice, CreateInvoiceInput } from "../useCases/createInvoice"

export const buildCreateInvoiceRequest = (createInvoice: CreateInvoice) => {
	return async function createInvoiceRequest(input: CreateInvoiceInput, res: Response) {
		return await createInvoice(input)
	}
}
