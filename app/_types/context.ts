
import { User } from "firebase/auth";
import React from "react"

export interface IUserContext {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}
