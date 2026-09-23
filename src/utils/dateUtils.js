export function getDateKey(date) {

    return (
        date.getFullYear()
        +
        "-"
        +
        String(
            date.getMonth() + 1
        ).padStart(2, "0")
        +
        "-"
        +
        String(
            date.getDate()
        ).padStart(2, "0")
    );

}

export function parseLocalDate(dateString) {

    if(!dateString)
        return null;

    const match =
        /^(\d{4})-(\d{2})-(\d{2})$/.exec(
            dateString
        );

    if(!match)
        return new Date(dateString);

    return new Date(
        Number(match[1]),
        Number(match[2]) - 1,
        Number(match[3]),
        12,
    );

}

export function isWorkingDay(date, calendar) {

    const key =
        getDateKey(date);

    if(calendar[key]) {

        return (
            calendar[key].type === "working"
        );

    }

    const day =
        date.getDay();

    return (
        day !== 0 &&
        day !== 6
    );

}

export function getTimetableDayName(date, calendar) {

    const key =
        getDateKey(date);

    if(calendar[key]?.sourceDay)
        return calendar[key].sourceDay;

    return date.toLocaleDateString(
        "en-US",
        {
            weekday: "long",
        }
    );

}