import { Timestamp } from "firebase/firestore"

import { Role } from "@/app/_constants/constants"

export interface IBooking {
    id: string;
    title: string;
    startTime: string;
    endTime: string;
    notes: string;
    uuids: string[];
}

export interface IUser {
    uid: string;
    email: string;
    firstName: string;
    lastName: string;
    role: Role;
}

export interface IAvailability {
    id: string;
    from: Timestamp;
    to: Timestamp;
    uid: string;
}
