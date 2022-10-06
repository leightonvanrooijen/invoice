import { DataStore } from "../../common/db/testDB"
import { Product } from "../domain/product"

export type GetRepoProduct = (id: string) => Promise<Product>

export const buildGetRepoProduct = (db: DataStore<Product>): GetRepoProduct => {
	return async function getRepoProduct(id) {
		const product = await db.get(id)
		if (!product) {
			throw new Error("Could not find a Product matching the ID provided")
		}
		return product
	}
}
