import { User } from "firebase/auth"
import { Moment } from "moment"
import React from "react"

import { Modals, Role } from "@/app/_constants/constants"

import { IAvailability, IBooking, IUser } from "./entities"

export interface IUserContext {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    role: Role | null;
    setRole: React.Dispatch<React.SetStateAction<Role | null>>;
    users: IUser[];
}

export interface IModalsContext {
    activeModal: Modals | null;
    setActiveModal: React.Dispatch<React.SetStateAction<Modals | null>>;
}

export interface ICalendarContext {
    selectedSlots: ICalendarState | null;
    setSelectedSlots: React.Dispatch<React.SetStateAction<ICalendarState | null>>;
    selectedEvent: IBooking | null;
    setSelectedEvent: React.Dispatch<React.SetStateAction<IBooking | null>>;
    events: IBooking[];
    fetchBookings: () => Promise<void>;
    availabilities: IAvailability[];
    fetchAvailabilities: () => Promise<void>;
}

export interface ICalendarState {
    startTime: Moment | null;
    endTime: Moment | null;
}
