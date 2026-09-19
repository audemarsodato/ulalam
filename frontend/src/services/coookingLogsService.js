
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

export async function fetchRecordSession({ ulamId, token }) {
        const response = await fetch(`/api/v1/cooking-logs`, {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ulamId})
        })

        const json = await response.json()

        if (!response.ok) return {error: json.error, record: null}

        return {record: json.cooking_log, error: null}
}

export function getCookingTimeDuration(startTime) {
        if (!(startTime instanceof Date)) {
                console.error('startTime must be a Date object')
                return 
        }

        const minuteInMilliseconds = 1000 * 60

        const endTime = new Date()

        const millisecondsPassed = endTime.getTime() - startTime.getTime()
        const minutesPassed = millisecondsPassed / minuteInMilliseconds
        const secondsPassed = (minutesPassed * 60).toFixed()

        return minutesPassed
}