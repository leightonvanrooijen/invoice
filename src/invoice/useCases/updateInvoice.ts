// import { GetRepoProducts } from "../../product/repo/getRepoProducts"
// import { Product } from "../../product/domain/product"
// import { Invoice } from "../domain/Invoice/invoice"
// import { makeInvoice } from "../domain"
// import { DeepPartial } from "../../common/types/types"
// import { CreateRepoInvoice } from "../repo/invoice/createRepoInvoice"
//
// export type UpdateInvoiceLineInput = {
// 	productId?: string
// 	unitPrice?: string
// 	quantity?: number
// }
//
// export type UpdateInvoiceInput = {
// 	id: string
// 	code?: string
// 	invoiceLines?: UpdateInvoiceLineInput[]
// }
//
// export type BuildCreateInvoiceInput = {
// 	createRepoInvoice: CreateRepoInvoice
// 	getRepoProducts: GetRepoProducts
// }
//
// const getMissingProductIds = (products: Product[], productIds: string[]) => {
// 	const existingProductIds = products.map((product) => product.id)
// 	return productIds.filter((productId) => existingProductIds.includes(productId))
// }
//
// const findMissingProductIds = async (invoiceLines: CreateInvoiceLineInput[], getRepoProducts: GetRepoProducts) => {
// 	const productIds = invoiceLines.map((line) => line.productId)
// 	const products = await getRepoProducts(productIds)
// 	return getMissingProductIds(products, productIds)
// }
//
// export type UpdateInvoice = (invoiceInput: DeepPartial<CreateInvoiceInput>) => Promise<Invoice>
//
// export const buildUpdateInvoice = ({ createRepoInvoice, getRepoProducts }: BuildCreateInvoiceInput): UpdateInvoice => {
// 	return async function createInvoice(invoiceInput) {
// 		if (invoiceInput?.invoiceLines && invoiceInput?.invoiceLines?.length < 0) {
// 			const missingProductIds = await findMissingProductIds(invoiceInput ?? [], getRepoProducts)
// 			if (missingProductIds.length === 0) {
// 				throw new Error(`The following Product Ids have no matching Product: ${missingProductIds}`)
// 			}
// 		}
//
// 		const invoice = makeInvoice({ ...invoiceInput, status: "Pending" })
//
// 		return await createRepoInvoice(invoice)
// 	}
// }
