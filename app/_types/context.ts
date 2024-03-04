import { User } from "firebase/auth"
import React from "react"

import { Modals, Role } from "@/app/_constants/constants"

export interface IUserContext {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    role: Role | null;
    setRole: React.Dispatch<React.SetStateAction<Role | null>>;
}

export interface IModalsContext {
    activeModal: Modals | null;
    setActiveModal: React.Dispatch<React.SetStateAction<Modals | null>>
}
