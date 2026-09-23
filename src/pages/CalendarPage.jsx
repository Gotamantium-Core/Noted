import { useState } from "react";
import { isWorkingDay } from "../utils/dateUtils";

import DayAttendance from "./DayAttendance";

import {
    loadCalendar,
} from "../utils/storage";


export default function CalendarPage() {

    const [calendar, setCalendar] =
        useState(loadCalendar());

    const [selectedDate, setSelectedDate] =
        useState(null);


    const [currentMonth, setCurrentMonth] =
        useState(new Date());



    function refreshCalendar() {
        setCalendar(loadCalendar());
    }



    function getDaysInMonth() {

        const year =
            currentMonth.getFullYear();

        const month =
            currentMonth.getMonth();


        const firstDay =
            new Date(
                year,
                month,
                1
            );


        const lastDay =
            new Date(
                year,
                month + 1,
                0
            );


        const days = [];


        for (
            let i = 0;
            i < firstDay.getDay();
            i++
        ) {
            days.push(null);
        }


        for (
            let i = 1;
            i <= lastDay.getDate();
            i++
        ) {

            days.push(
                new Date(
                    year,
                    month,
                    i
                )
            );

        }


        return days;
    }




    if (selectedDate) {

        return (

            <DayAttendance

                date={selectedDate}

                onBack={() => {

                    refreshCalendar();

                    setSelectedDate(null);

                }}

            />

        );

    }




    return (

        <div className="p-6">


            <h1 className="mb-5 text-3xl font-bold">
                Calendar
            </h1>



            <div className="mb-5 flex items-center justify-between">


                <button
                    className="border border-gray-300 px-3 py-1 dark:border-gray-600 dark:hover:bg-gray-800"
                    onClick={() => {

                        setCurrentMonth(
                            new Date(
                                currentMonth.getFullYear(),
                                currentMonth.getMonth() - 1,
                                1
                            )
                        );

                    }}
                >
                    ←
                </button>



                <h2 className="font-semibold">
                    {
                        currentMonth.toLocaleDateString(
                            "en-US",
                            {
                                month: "long",
                                year: "numeric",
                            }
                        )
                    }
                </h2>



                <button
                    className="border border-gray-300 px-3 py-1 dark:border-gray-600 dark:hover:bg-gray-800"
                    onClick={() => {

                        setCurrentMonth(
                            new Date(
                                currentMonth.getFullYear(),
                                currentMonth.getMonth() + 1,
                                1
                            )
                        );

                    }}
                >
                    →
                </button>


            </div>




            <div className="grid grid-cols-7 gap-1 text-center">


                {
                    [
                        "Sun",
                        "Mon",
                        "Tue",
                        "Wed",
                        "Thu",
                        "Fri",
                        "Sat",
                    ].map(
                        (day) => (

                            <div
                                key={day}
                                className="font-bold"
                            >
                                {day}
                            </div>

                        )
                    )
                }



                {
                    getDaysInMonth().map(
                        (
                            date,
                            index
                        ) => {


                            if (!date) {

                                return (

                                    <div
                                        key={index}
                                        className="h-20"
                                    />

                                );

                            }



                            const working =
                                isWorkingDay(date, calendar);



                            return (

                                <div

                                    key={index}

                                    className={`
                                        h-20
                                        border
                                        border-gray-200
                                        p-2
                                        dark:border-gray-700
                                        ${
                                            !working
                                                ? "bg-gray-200 dark:bg-gray-800"
                                                : ""
                                        }
                                    `}

                                >


                                    <button

                                        className="h-full w-full"

                                        onClick={() =>
                                            setSelectedDate(date)
                                        }

                                    >

                                        <div className="font-semibold">
                                            {
                                                date.getDate()
                                            }
                                        </div>



                                        <div className="text-xs dark:text-gray-400">

                                            {
                                                working
                                                    ? "Working"
                                                    : "Holiday"
                                            }

                                        </div>


                                    </button>



                                </div>

                            );

                        }
                    )
                }


            </div>


        </div>

    );

}