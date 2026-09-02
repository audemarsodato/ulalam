
export async function fetchUlam({ ulamId, token }) {
        const response = await fetch(`/api/v1/ulams/${ulamId}`, {
                method: 'GET',
                headers: {
                        authorization: `Bearer ${token}`
                },
        })

        const json = await response.json()

        if (!response.ok) return {error: json.error, ulam: null}

        return {ulam: json, error: null}
}

export async function fetchCreateUlam({ formData, token }) {
        const response = await fetch('/api/v1/ulams', {
                method: 'POST',
                headers: {
                        authorization: `Bearer ${token}`
                },
                body: formData
        })

        const json = await response.json()

        if (!response.ok) return {error: json.error, ulam: null}

        return {ulam: json, error: null}
}