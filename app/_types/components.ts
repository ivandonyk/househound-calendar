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

import { Modals } from "@/app/_constants/constants"

import { IBooking } from "./entities";
import { PickersDayProps } from "@mui/x-date-pickers";

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

export interface IWeeklyHourSelectorProps {
    day: Moment;
}

export interface ISelectProps {
    options: Moment[];
    onChange?: (value: Moment) => void;
    value?: string;
}

export interface IBookingsProps {
    week: Moment[];
}

export interface IDailyParsedEvent {
    date: Moment;
    events: IBooking[];
}

export interface ICalendarDayProps extends PickersDayProps<Moment> {
    selectedDate?: Moment;
    setSelectedDate: React.Dispatch<React.SetStateAction<Moment | undefined>>;
}
