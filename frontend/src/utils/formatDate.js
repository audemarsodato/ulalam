import { isToday, isYesterday, formatDistanceToNow } from 'date-fns'

export function formatCreatedAt(createdAt) {
        const date = new Date(createdAt)

        if (isToday(date)) return 'Today'
        if (isYesterday(date)) return 'Yesterday'

        return formatDistanceToNow(date, { addSuffix: true })
}