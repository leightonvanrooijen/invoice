import { DataStore } from "../../common/db/testDB"
import { Product } from "../domain/product"

export type GetRepoProducts = (ids: string[]) => Promise<Product[]>

export const buildGetRepoProducts = (db: DataStore<Product>): GetRepoProducts => {
	return async function getRepoProducts(ids) {
		const products = await db.getByIds(ids)
		if (products.length === 0) {
			throw new Error("Could not find a any Products matching the IDs provided")
		}
		return products
	}
}
