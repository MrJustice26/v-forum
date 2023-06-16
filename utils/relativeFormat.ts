export const relativeFormat = (time: string) => {
    const date = new Date(time)

    return `${date.getDate().toString().padStart(2, '0')}.${(
        date.getMonth() + 1
    )
        .toString()
        .padStart(2, '0')}.${date.getFullYear()}`
}
