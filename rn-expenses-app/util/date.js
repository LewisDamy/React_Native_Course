export function getFormattedDate(date) {
    // return the date from the Object new Date as an string of 10 chars 'YYYY-MM-DD'
    return date.toISOString().slice(0, 10);
}

// function to get a date that is X number of days in the past
export function getDateMinusDays(date, days) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
