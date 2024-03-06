import { IBooking } from "./entities"

export interface ICreateBookingPayload extends Omit<IBooking, "id"> {}

export interface IUpdateBookingPayload extends Partial<IBooking> {
    uuids: string[]
}