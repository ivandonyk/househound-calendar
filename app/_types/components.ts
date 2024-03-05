import React, {
    DetailedHTMLProps,
    InputHTMLAttributes,
    ButtonHTMLAttributes,
    SelectHTMLAttributes,
} from "react"
import { 
    FormikConfig, 
    FormikValues 
} from "formik"
import { Moment } from "moment"

import { IBooking } from "./entities"

import { Modals } from "@/app/_constants/constants"

export interface ICalendarProps {}

export interface ITextInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    fieldName: string;
}

export interface IFormProps extends FormikConfig<FormikValues> {
    children?: React.ReactNode | React.ReactNode[];
}

export interface IFormButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

export interface IFormSelectProps extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>  {
    fieldName: string;
}

export interface IAvailabilityDateSelectProps {
    date: Moment;
}

export interface IModalLayoutProps {
    modal: Modals;
    children?: React.ReactNode | React.ReactNode[];
    onClose?: () => void;
}

export interface IBackdropProps {
    className?: string;
    onClick?: () => void;
}

export interface ICalendarHeaderProps {
    onNext?: () => void;
    onBack?: () => void;
    calendarDate: {
        start: string;
        end: string;
    };
}
