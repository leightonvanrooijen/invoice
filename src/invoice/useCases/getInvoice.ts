import { GetRepoInvoice, RepoInvoice } from "../repo/invoice/getRepoInvoice"

export type GetInvoice = (id: string) => Promise<RepoInvoice>

export const buildGetInvoice = ({ getRepoInvoice }: { getRepoInvoice: GetRepoInvoice }): GetInvoice => {
	return async function getInvoice(id) {
		if (!id) {
			throw new Error("Please provide an ID")
		}

		return await getRepoInvoice(id)
	}
}
