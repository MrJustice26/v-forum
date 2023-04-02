import { formatDistance, subDays } from 'date-fns'

export const relativeFormat = (time: string) => {
    return formatDistance(subDays(new Date(time), 3), new Date(), {
        addSuffix: true,
    })
}
