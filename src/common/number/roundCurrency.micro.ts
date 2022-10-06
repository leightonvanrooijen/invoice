import { roundCurrency } from "./roundCurrency"

describe("roundCurrency", () => {
	it("rounds to 2dp", () => {
		const rounded = roundCurrency("1.2422399849445")

		expect(rounded).toEqual("1.24")
	})
	it("rounds half up", () => {
		const rounded = roundCurrency("1.225")

		expect(rounded).toEqual("1.23")
	})
	it("rounds above half  up", () => {
		const rounded = roundCurrency("1.2269")

		expect(rounded).toEqual("1.23")
	})
	it("rounds below half down", () => {
		const rounded = roundCurrency("1.2249")

		expect(rounded).toEqual("1.22")
	})
	it("requires a valid number", () => {
		const rounded = () => roundCurrency("word")

		expect(rounded).toThrow()
	})
})
