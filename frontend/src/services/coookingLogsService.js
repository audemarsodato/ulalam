
export async function fetchCookingHistory({ mealplanId, token }) {
        const response = await fetch(`/api/v1/mealplans/${mealplanId}`, {
                method: 'DELETE',
                headers: {
                        authorization: `Bearer ${token}`
                }
        })

        const json = await response.json()

        if (!response.ok) return {error: json.error, mealplan: null}

        return {mealplan: json.mealplan, error: null}
}