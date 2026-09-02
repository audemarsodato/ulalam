
// TODO move to cookingLogs service
export async function fetchCookingRecords({ token, limit }) { // TODO implement pagination and limit fetch
        const response = await fetch('/api/v1/cooking-logs', {
                method: 'GET',
                headers: {
                        authorization: `Bearer ${token}`
                }
        })
        
        const json = await response.json()
        
        if (!response.ok) return {error: json.error, cooking_records: null}
        
        return {cooking_records: json.cooking_records, error: null}
}

export async function fetchUlamsFromFollowings(token) {
        const response = await fetch('/api/v1/users/me/ulams/from-following', {
                method: 'GET',
                headers: {
                        authorization: `Bearer ${token}`
                }
        })

        const json = await response.json()

        if (!response.ok) return {error: json.error, ulams_from_followings: null}

        return {ulams_from_followings: json.ulams_from_followings, error: null}
}
export async function fetchChangeProfileImage({ imageFile, token }) {
        const formData = new FormData()
        formData.append('profile-image', imageFile)

        const response = await fetch('/api/v1/users/me/profile-image', {
                method: 'PATCH',
                headers: {
                        authorization: `Bearer ${token}`
                },
                body: formData
        })

        const json = await response.json()

        if (!response.ok) return {error: json.error, profile_image_url: null}

        return {profile_image_url: json.profile_image_url, error: null}
}

export async function fetchUserByUsername({ username, token }) {
        const response = await fetch(`/api/v1/users/${username}`, {
                method: 'GET',
                headers: {
                        authorization: `Bearer ${token}`
                }
        })

        const json = await response.json()
        
        if (!response.ok) return {error: json.error, user: null}

        return {user: json.user, error: null}
}

export async function fetchCurrentUsersDetails(token) {
        const response = await fetch(`/api/v1/users/me`, {
                method: 'GET',
                headers: {
                        authorization: `Bearer ${token}`
                }
        })

        const json = await response.json()
        
        if (!response.ok) return {error: json.error, user: null}

        return {user: json.user, error: null}
}

export async function fetchPublishedUlams({ userId, token }) {
        const response = await fetch(`/api/v1/users/${userId}/ulams`, {
                method: 'GET',
                headers: {
                        authorization: `Bearer ${token}`
                }
        })

        const json = await response.json()

        if (!response.ok) return {error: json.error, published_ulams: null}

        return {published_ulams: json.published_ulams, error: null}
}

export async function fetchSpecialties({ userId, token }) {
        const response = await fetch(`/api/v1/users/${userId}/earned-specialties`, {
                method: 'GET',
                headers: {
                        authorization: `Bearer ${token}`
                }
        })

        const json = await response.json()
        
        if (!response.ok) return {error: json.error, specialites: null}

        return {specialites: json.specialites, error: null}
}