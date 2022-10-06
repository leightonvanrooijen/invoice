import { buildGetRepoInvoiceProducts } from "./getRepoProducts"
import { fakeProduct } from "../../utils/fakeProduct"
import { GetRepoProducts } from "../../../product/repo/getRepoProducts"

describe("getRepoInvoiceProducts", () => {
	it("returns any Products matching the IDs provided", async () => {
		const dbProducts = [fakeProduct(), fakeProduct()]
		const getRepoProduct: GetRepoProducts = async () => Promise.resolve(dbProducts)
		const getProducts = buildGetRepoInvoiceProducts(getRepoProduct)

		const products = await getProducts([dbProducts[0].id, dbProducts[1].id, "xyz"])

		expect(products).toHaveLength(dbProducts.length)
	})
	it("requires at least one product Product to exist in the datastore", async () => {
		const getRepoProduct: GetRepoProducts = async () => Promise.resolve([])
		const getProducts = buildGetRepoInvoiceProducts(getRepoProduct)

		const products = async () => getProducts(["xyz"])

		await expect(products).rejects.toThrow()
	})
})
