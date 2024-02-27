import React from "react"
export interface IFormikContext {
    [key: string]: string | number;
}

export interface IAuthProps {
    auth?: boolean;
    children?: React.ReactNode | React.ReactNode[];
    Element: React.ReactElement;
}
