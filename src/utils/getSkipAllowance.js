import getSubjectAttendance from "./getSubjectAttendance";

import {
    loadMinimumAttendance,
    loadSemester,
    loadTimetable,
    loadCalendar,
} from "./storage";

import {
    isWorkingDay,
    getTimetableDayName,
    parseLocalDate,
} from "./dateUtils";

export default function getSkipAllowance(overrides = {}) {

    const attendance =
        getSubjectAttendance();

    const minimumAttendance =
        overrides.minimumAttendance
        ?? loadMinimumAttendance();

    const semester =
        overrides.semester
        ?? loadSemester();

    const timetable =
        overrides.timetable
        ?? loadTimetable();

    const calendar =
        overrides.calendar
        ?? loadCalendar();

    const semesterClassCounts =
        countSemesterClasses(
            semester.start,
            semester.end,
            timetable,
            calendar
        );

    return attendance.map(subject => {

        const minimum =
            minimumAttendance[subject.id] ?? 75;

        const totalSemesterClasses =
            semesterClassCounts[subject.id] ?? 0;

        const futureClasses =
            Math.max(
                0,
                totalSemesterClasses - subject.total
            );

        const canSkip =
            Math.max(
                0,
                Math.floor(
                    subject.attended +
                    futureClasses -
                    (
                        minimum / 100
                        *
                        totalSemesterClasses
                    )
                )
            );

        return {

            ...subject,

            minimum,

            futureClasses,

            semesterTotal: totalSemesterClasses,

            canSkip,

        };

    });

}

function countSemesterClasses(
    semesterStart,
    semesterEnd,
    timetable,
    calendar
) {

    const counts = {};

    if(
        !semesterStart ||
        !semesterEnd
    )
        return counts;

    let current =
        parseLocalDate(semesterStart);

    const end =
        parseLocalDate(semesterEnd);

    while(current <= end) {

        if(isWorkingDay(current, calendar)) {

            const dayName =
                getTimetableDayName(
                    current,
                    calendar
                );

            const periods =
                timetable[dayName] ?? [];

            periods.forEach(period => {

                if(!period)
                    return;

                counts[period] =
                    (counts[period] ?? 0) + 1;

            });

        }

        current.setDate(
            current.getDate() + 1
        );

    }

    return counts;

}