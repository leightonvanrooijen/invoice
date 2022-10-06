import { GetRepoProducts } from "../../../product/repo/getRepoProducts"

export const buildGetRepoInvoiceProducts = (getProductsService: GetRepoProducts): GetRepoProducts => {
	return async function getRepoInvoiceProducts(ids) {
		// This will eventually consume the Product API
		const products = await getProductsService(ids)
		if (products.length === 0) {
			throw new Error("Could not find a any Products matching the IDs provided")
		}
		return products
	}
}
