/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
	clearMocks: true,
	preset: "ts-jest",
	testEnvironment: "node",
	testMatch: ["./**/?(*.)+(integration|micro).ts"],
	roots: ["./src"],
	testPathIgnorePatterns: ["node_modules", ".devcontainer", "dist"],
	watchPathIgnorePatterns: ["node_modules", ".devcontainer", "dist"],
}
