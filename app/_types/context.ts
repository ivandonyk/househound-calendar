import { User } from "firebase/auth"
import React from "react"

import { Role } from "@/app/_constants/constants"

export interface IUserContext {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    role: Role | null;
    setRole: React.Dispatch<React.SetStateAction<Role | null>>;
}
