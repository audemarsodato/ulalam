

export async function fetchRemoveMealplan({ mealplanId, token }) {
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

export async function fetchMealplans(token) {
        const response = await fetch(`/api/v1/mealplans`, {
                method: 'GET',
                headers: {
                        authorization: `Bearer ${token}`
                }
        })

        const json = await response.json()

        if (!response.ok) return {error: json.error, mealplans: null}

        return {mealplans: json.mealplans, error: null}
}

export async function fetchAddMealplan({ mealplan, token }) {
        const response = await fetch(`/api/v1/mealplans`, {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${token}`
                },
                body: JSON.stringify(mealplan)
        })

        const json = await response.json()

        if (!response.ok) return {error: json.error, mealplan: null}

        return {mealplan: json.mealplan, error: null}
}