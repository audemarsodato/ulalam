
export async function fetchCookingHistory({ page, limit, token }) {
        const response = await fetch(`/api/v1/cooking-logs?page=${page}&limit=${limit}`, {
                method: 'GET',
                headers: {
                        authorization: `Bearer ${token}`
                }
        })

        const json = await response.json()

        if (!response.ok) return {error: json.error, records: null}

        return {records: json.cooking_records, error: null}
}