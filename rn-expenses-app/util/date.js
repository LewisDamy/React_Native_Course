export function getFormattedDate(date) {
    // return the date into format YYYY-MM-DD with an +1 to start Jan as 1
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

// function to get a date that is X number of days in the past
export function getDateMinusDays(date, days) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}