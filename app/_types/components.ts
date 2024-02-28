import {
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

export interface ICalendarProps {
    bookings: IBooking[];
}

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