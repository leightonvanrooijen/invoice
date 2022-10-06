import { Num } from "../../common/number/num"

export type Product = {
	id: string
	name: string
	price: string
}

export type ProductInput = Product

export type MakeProduct = ({ id, name, price }: ProductInput) => Product

export const buildMakeProduct = ({ num }: { num: Num }): MakeProduct => {
	return function makeProduct({ id, name, price }) {
		if (!id) {
			throw new Error("A Product must have a ID")
		}

		if (!name) {
			throw new Error("A Product must have a name")
		}

		if (!price || num(price).isLessThanOrEqualTo(0)) {
			throw new Error("A Product must have a cost above 0")
		}

		return Object.freeze({
			id,
			name,
			price,
		})
	}
}
