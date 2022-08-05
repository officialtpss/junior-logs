export enum Day {
    Sunday = "Sunday",
    Monday = "Monday",
    Tuesday = "Tuesday",
    Wednesday = "Wednesday",
    Thursday = "Thursday",
    Friday = "Friday",
    Saturday = "Saturday"
}

export enum OneCharDay {
    Sunday = "S",
    Monday = "M",
    Tuesday = "T",
    Wednesday = "W",
    Thursday = "T",
    Friday = "F",
    Saturday = "S"
}

export function getDayFromString(day: string): Day {
    if (!(Object.keys(Day).includes(day))) {
        throw new Error(`Unknown day passed: ${day}`);
    } else {
        return Day[<Day>day];
    }
}

export function getDayFromShortDayString(day: string): Day {
    if (day == 'sun') {
        return Day.Sunday
    } else if (day == 'mon') {
        return Day.Monday
    } else if (day == 'tues') {
        return Day.Tuesday
    } else if (day == 'wed') {
        return Day.Wednesday
    } else if (day == 'thurs') {
        return Day.Thursday
    } else if (day == 'fri') {
        return Day.Friday
    } else if (day == 'sat') {
        return Day.Saturday
    } else {
        throw new Error(`Unknown day passed: ${day}`);
    }
}