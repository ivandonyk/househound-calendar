import moment, { Moment } from "moment"

export const getMoment = (arg: any) => {
    return moment(arg, "DD dddd MMMM yyyy hh:mm a")
}

export const formatMoment = (time: Moment) => {
    return time.format("DD dddd MMMM yyyy hh:mm a")
}
