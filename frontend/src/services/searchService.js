
export async function fetchUlamsByIngredients({ ingredientsString, token }) {
        const response = await fetch(`/api/v1/ulams?ingredients=${ingredientsString}`, {
                method: 'GET',
                headers: {
                        authorization: `Bearer ${token}`
                }
        })

        const json = await response.json()

        if (!response.ok) return {error: json.error, ulams: null}

        return {ulams: json.matchedUlams, error: null}
}