import { fakeProduct } from "../../invoice/utils/fakeProduct"
import { Product } from "../domain/product"
import { TestDB } from "../../common/db/testDB"
import { buildGetRepoProduct } from "./getRepoProduct"

describe("getRepoProduct", () => {
	it("returns an Product matching the ID provided", async () => {
		const dbProduct = fakeProduct()
		const getProduct = buildGetRepoProduct(new TestDB<Product>([dbProduct], "id"))

		const product = await getProduct(dbProduct.id)

		expect(product.id).toEqual(dbProduct.id)
	})
	it("requires the Product to exist in the datastore", async () => {
		const dbProduct = fakeProduct()
		const getProduct = buildGetRepoProduct(new TestDB<Product>([dbProduct], "id"))

		const product = async () => getProduct("xjxk")

		await expect(product).rejects.toThrow()
	})
})
