import { fakeProduct } from "../../invoice/utils/fakeProduct"
import { Product } from "../domain/product"
import { TestDB } from "../../common/db/testDB"
import { buildGetRepoProducts } from "./getRepoProducts"

describe("getRepoProducts", () => {
	it("returns any Products matching the IDs provided", async () => {
		const dbProducts = [fakeProduct(), fakeProduct()]
		const getProducts = buildGetRepoProducts(new TestDB<Product>(dbProducts, "id"))

		const products = await getProducts([dbProducts[0].id, dbProducts[1].id, "xyz"])

		expect(products).toHaveLength(dbProducts.length)
	})
	it("requires at least one product Product to exist in the datastore", async () => {
		const dbInvoice = fakeProduct()
		const getProducts = buildGetRepoProducts(new TestDB<Product>([dbInvoice], "id"))

		const products = async () => getProducts(["xjxk"])

		await expect(products).rejects.toThrow()
	})
})
