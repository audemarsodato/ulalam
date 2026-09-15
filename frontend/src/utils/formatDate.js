import { isToday, isYesterday, formatDistanceToNow } from 'date-fns'

export function formatCreatedAt(createdAt) {
        const date = new Date(createdAt)

        if (isToday(date)) return 'Today'
        if (isYesterday(date)) return 'Yesterday'

        return formatDistanceToNow(date, { addSuffix: true })
}

export function formatHistoryDate(dateString) {
        const date = new Date(dateString)
        const today = new Date()
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)

        if (today.toISOString().split('T')[0] === dateString) {
                return `Today, ${date.toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric'
                })}`
        }

        if (yesterday.toISOString().split('T')[0] === dateString) {
                return `Yesterday, ${date.toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric'
                })}`
        }

        return date.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                weekday: 'long'
        })
}