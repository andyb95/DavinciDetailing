import React, { useState, useEffect } from 'react'
import moment from 'moment'
import './Calendar.css'

const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState(moment())

    const CalendarHeader = ({ value, onChange }) => {
        const currMonthName = () => {
            return value.format("MMMM");
        }
        
        const currYear = () => {
            return value.format("YYYY");
        }
        
        const prevMonth = () => {
            return value.clone().subtract(1, "month");
        }
        
        const nextMonth = () => {
            return value.clone().add(1, "month");
        }
        
        const thisMonth = () => {
            return value.isSame(new Date(), "month");
        }
        
        return (
            <div className="header">
                <div
                    className="previous"
                    onClick={() => !thisMonth() && onChange(prevMonth())}
                >
                    {!thisMonth() ? String.fromCharCode(171) : null}
                </div>
                <div className="current">
                    {currMonthName()} {currYear()}
                </div>
                <div className="next" onClick={() => onChange(nextMonth())}>
                    {String.fromCharCode(187)}
                </div>
            </div>
        );
    }

    const Calendar = ({ value, onChange }) => {
        const [calendar, setCalendar] = useState([]);
      
        useEffect(() => {
            setCalendar(buildCalendar(value));
        }, [value]);
      
        const buildCalendar = (date) => {
            const a = [];
        
            const startDay = date.clone().startOf("month").startOf("week");
            const endDay = date.clone().endOf("month").endOf("week");
        
            const _date = startDay.clone().subtract(1, "day");
        
            while (_date.isBefore(endDay, "day")) {
                a.push(
                Array(7)
                    .fill(0)
                    .map(() => _date.add(1, "day").clone())
                );
            }
            return a;
        }
      
        const isSelected = (day) => {
            return value.isSame(day, "day");
        }
      
        const beforeToday = (day) => {
            return moment(day).isBefore(new Date(), "day");
        }
      
        const isToday = (day) => {
            return moment(new Date()).isSame(day, "day");
        }
      
        const dayStyles = (day) => {
            if (beforeToday(day)) return "before";
            if (isSelected(day)) return "selected";
            if (isToday(day)) return "today";
            return "";
        }
      
        return (
            <div className="calendar">
                <CalendarHeader value={value} onChange={onChange} />
        
                <div className="body">
                <div className="day-names">
                    {["s", "m", "t", "w", "t", "f", "s"].map((d, i) => (
                    <div className="week" key={i}>{d}</div>
                    ))}
                </div>
                {calendar.map((week, wi) => (
                    <div key={wi}>
                    {week.map((day, di) => (
                        <div
                        key={di}
                        className="day"
                        onClick={() => {
                            if (day < moment(new Date()).startOf("day")) return;
                            onChange(day);
                        }}
                        >
                        <div className={dayStyles(day)}>
                            {day.format("D").toString()}
                        </div>
                        </div>
                    ))}
                    </div>
                ))}
                </div>
            </div>
        );
    }

    return (
        <Calendar value={selectedDate} onChange={setSelectedDate} />
    )
}

export default Calendar