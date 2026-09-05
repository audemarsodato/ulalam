
export async function fetchDeleteUlam({ ulamId, token }) {
        const response = await fetch(`/api/v1/ulams/${ulamId}`, {
                method: 'DELETE',
                headers: {
                        authorization: `Bearer ${token}`
                }
        })

        const json = await response.json()

        if (!response.ok) return {error: json.error, ulam: null}

        return {ulam: json, error: null}
}

export async function fetchUnbookmarkUlam({ ulamId, token }) {
        const response = await fetch(`/api/v1/ulams/${ulamId}/bookmark`, {
                method: 'DELETE',
                headers: {
                        authorization: `Bearer ${token}`
                }
        })

        const json = await response.json()

        if (!response.ok) return {error: json.error, ulam: null}

        return {ulam: json, error: null}
}

export async function fetchBookmarkUlam({ ulamId, token }) {
        const response = await fetch(`/api/v1/ulams/${ulamId}/bookmark`, {
                method: 'PATCH',
                headers: {
                        authorization: `Bearer ${token}`
                }
        })

        const json = await response.json()

        if (!response.ok) return {error: json.error, ulam: null}

        return {ulam: json, error: null}
}

export async function fetchAddComment({ ulamId, content, token }) {
        const response = await fetch(`/api/v1/ulams/${ulamId}/comments`, {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${token}`
                },
                body: JSON.stringify({content})
        })

        const json = await response.json()

        if (!response.ok) return {error: json.error, comment: null}

        return {comment: json, error: null}
}

/* TODO note
*  I forgot I actually added the comments in the getUlam controller in the backend. 
*  This is why i need a backend documentation on how to consume endpoints, what input they need, whats their output, and also their process that may or may not contain logics
*/
export async function fetchComments({ ulamId, token }) {
        const response = await fetch(`/api/v1/ulams/${ulamId}/comments`, {
                method: 'GET',
                headers: {
                        authorization: `Bearer ${token}`
                }
        })

        const json = await response.json()

        if (!response.ok) return {error: json.error, comments: null}

        return {comments: json, error: null}
}

export async function fetchVariations({ ulamId, token }) {
        const response = await fetch(`/api/v1/ulams/${ulamId}/variations`, {
                method: 'GET',
                headers: {
                        authorization: `Bearer ${token}`
                }
        })

        const json = await response.json()

        if (!response.ok) return {error: json.error, ulams: null}

        return {ulams: json, error: null}
}

export async function fetchUnlikeUlam({ ulamId, token }) {
        const response = await fetch(`/api/v1/ulams/${ulamId}/like`, {
                method: 'DELETE',
                headers: {
                        authorization: `Bearer ${token}`
                }
        })

        const json = await response.json()

        if (!response.ok) return {error: json.error, ulam: null}

        return {ulam: json, error: null}
}

export async function fetchLikeUlam({ ulamId, token }) {
        const response = await fetch(`/api/v1/ulams/${ulamId}/like`, {
                method: 'PATCH',
                headers: {
                        authorization: `Bearer ${token}`
                }
        })

        const json = await response.json()

        if (!response.ok) return {error: json.error, ulam: null}

        return {ulam: json, error: null}
}

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