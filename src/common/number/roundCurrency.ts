import { num } from "./num"

export type RoundCurrency = (currency: string) => string

export const roundCurrency: RoundCurrency = (currency) => {
	num.config({ ROUNDING_MODE: 4 })
	const rounded = num(currency).toFormat(2)

	if (rounded === "NaN") {
		throw new Error("Currency entered is not a valid number")
	}

	return rounded
}
