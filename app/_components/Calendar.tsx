"use client"

import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import timeGridPlugin from '@fullcalendar/timegrid'
import FullCalendar from '@fullcalendar/react'
import React, { 
    useEffect, 
    useRef, 
    useState 
} from "react"
import moment, { Moment } from "moment"

import { useCalendarContext } from "@/app/_context/CalendarContext"
import { useModalContext } from "@/app/_context/ModalContext"
import { useUserContext } from "@/app/_context/UserContext"

import { Modals } from "@/app/_constants/constants"

import { ICalendarProps } from '@/app/_types/components'

import { getMoment } from '@/app/_utils/date'

import CalendarDayHeader from './CalendarDayHeader'
import CalendarHeaderMui from "./CalendarHeaderMui"
import CalendarSlotLabel from './CalendarSlotLabel'
import CalendarHeader from "./CalendarHeader"
import CalendarEvent from './CalendarEvent'
import WeeklyHeader from "./WeeklyHeader"
import CalendarDay from "./CalendarDay"

const Calendar: React.FC<ICalendarProps> = () => {
    const calendarRef = useRef<FullCalendar | null>(null)
    const mobileCalendarRef = useRef<FullCalendar | null>(null)
    const { setActiveModal } = useModalContext()
    const { setSelectedSlots, events } = useCalendarContext()
    const { user } = useUserContext()
    const [calendarDate, setCalendarDate] = useState({ start: "",  end: "" })
    const [selectedDate, setSelectedDate] = useState<Moment | undefined>(moment())
    const [muiDate, setMuiDate] = useState(moment())

    const handleSelect = (startDate: string, endDate: string) => {
        setSelectedSlots({
            startTime: moment(startDate),
            endTime: moment(endDate)
        })
        setActiveModal(Modals.OptionsModal)
    }

    const onNext = () => {
        const api = calendarRef.current?.getApi()
        api?.next()
    }

    const onBack = () => {
        const api = calendarRef.current?.getApi()
        api?.prev()
    }

    useEffect(() => {
        if(!events?.length || !user?.uid) return;
        const apis = [calendarRef.current?.getApi(), mobileCalendarRef.current?.getApi()]
        apis.forEach(api => {
            api?.removeAllEventSources()
            api?.addEventSource(events.map(({ startTime, title, id }) => {
                const end = getMoment(startTime).add("minutes", 30).toISOString()
                return { id, start: getMoment(startTime).toISOString(), title, end }
            }))
        })
    }, [events, user])

    const onMobileCalendarNext = () => {
        const nextDay = selectedDate?.clone().add(1, "day")
        setSelectedDate(nextDay)
        if(muiDate.month() !== nextDay?.month()) {
            const nextMuiMonth = muiDate.clone().add(1, "month")
            setMuiDate(nextMuiMonth)
        }
        const api = mobileCalendarRef.current?.getApi()
        api?.next()
    }

    const onMobileCalendarBack = () => {
        const prevDay = selectedDate?.clone().add(-1, "day")
        setSelectedDate(prevDay)
        if(muiDate.month() !== prevDay?.month()) {
            const prevMuiMonth = muiDate.clone().add(-1, "month")
            setMuiDate(prevMuiMonth)
        }
        const api = mobileCalendarRef.current?.getApi()
        api?.prev()
    }

    return (
        <>
            <div className='hidden md:block w-full h-full overflow-auto p-4'>
                <CalendarHeader onBack={onBack} onNext={onNext} calendarDate={calendarDate} />
                <FullCalendar
                    ref={calendarRef}
                    datesSet={date => setCalendarDate({ start: date.startStr, end: date.endStr })}
                    plugins={[timeGridPlugin]}
                    initialView='timeGridWeek'
                    firstDay={1}
                    eventOverlap={false}
                    headerToolbar={false}
                    selectOverlap={false}
                    allDaySlot={false}
                    selectLongPressDelay={1}
                    selectable={true}
                    select={(info) => handleSelect(info.startStr, info.endStr)}
                    slotDuration={{ hours: 1 }}
                    dayHeaderClassNames={["!p-0 !m-0"]}
                    slotLabelClassNames={['text-[18px] font-[400] p-2 !border-none text-[#FFFFFF50]']}
                    eventClassNames={["bg-transparent border-none !shadow-none"]}
                    slotLabelContent={props => <CalendarSlotLabel key={props.date.toLocaleString()} {...props} />}
                    eventContent={(props) => <CalendarEvent key={props.event.start?.toLocaleString()} {...props} />}
                    dayHeaderContent={props => <CalendarDayHeader key={props.date.toISOString()} {...props} />}
                    height="100%"
                />
            </div>
            <div className='md:hidden w-full h-full overflow-auto blue-scrollbar p-4'>
                <div className=" w-full">
                    <div className='w-[100%] md:hidden'>
                        <DateCalendar
                            classes={{
                                root: "!m-0 !w-[100%]",
                                viewTransitionContainer: " !rounded-xl !px-[10px] !bg-blue-5"
                            }}
                            disableHighlightToday
                            value={muiDate}
                            onChange={value => setMuiDate(value)}
                            slots={{
                                day: props => <CalendarDay 
                                    {...props}
                                    selectedDate={selectedDate}
                                    setSelectedDate={setSelectedDate}
                                    fullcalendarApi={mobileCalendarRef.current?.getApi()}
                                    availabilities={[]}
                                />,
                                calendarHeader: props => <CalendarHeaderMui 
                                    {...props}
                                />,
                            }}
                            dayOfWeekFormatter={(_, date) => `${date.format("ddd")[0].toUpperCase()}`}
                        />
                    </div>
                    <div className="">
                        <div className="flex justify-center items-center">
                            <WeeklyHeader 
                                onBack={onMobileCalendarBack}
                                onNext={onMobileCalendarNext}
                                selectedDate={selectedDate}
                            />
                        </div>
                        <div className="w-full rounded-xl bg-blue-grad px-[10px] py-[20px]">
                            <FullCalendar 
                                ref={mobileCalendarRef}
                                plugins={[timeGridPlugin]}
                                initialView='timeGridDay'
                                firstDay={1}
                                headerToolbar={false}
                                allDaySlot={false}
                                dayHeaderClassNames={["!hidden"]}
                                height="350px"
                                slotDuration={{ hours: 1 }}
                                eventContent={props => <div className="bg-[#E7F1FF] flex items-center pl-2 rounded-md h-full text-black-3 text-[12px] leading-[22px] font-[400]">
                                    <div>{moment(props?.event?._instance?.range?.start).utc().format("h:mm A")}</div>
                                    <div>-</div>
                                    <div>{moment(props?.event?._instance?.range?.end).utc().format("h:mm A")}</div>
                                </div>}
                                slotLabelContent={props => <div className="font-[600] text-[14px] leading-[22px] pt-2 pb-2">
                                    {moment(props.date).format("h A")}
                                </div>}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Calendar
