import { TestDB } from "../../common/db/testDB"
import { Product } from "../domain/product"
import { buildGetRepoProduct } from "./getRepoProduct"
import { buildGetRepoProducts } from "./getRepoProducts"

const productDb = new TestDB<Product>([], "id")

export const getRepoProduct = buildGetRepoProduct(productDb)
export const getRepoProducts = buildGetRepoProducts(productDb)
