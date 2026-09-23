import {
    loadSubjects,
    loadTimetable,
    loadAttendance,
    loadCalendar,
} from "./storage";

import { getTimetableDayName } from "./dateUtils";

export default function getSubjectAttendance() {

    const subjects = loadSubjects();
    const timetable = loadTimetable();
    const attendance = loadAttendance();
    const calendar = loadCalendar();

    const result = {};

    subjects.forEach(subject => {

        result[subject.id] = {

            id: subject.id,

            code: subject.code,

            name: subject.name,

            professor: subject.professor,

            attended: 0,

            absent: 0,

            total: 0,

        };

    });

    Object.entries(attendance)
        .forEach(([dateKey, periods]) => {

            const date =
                new Date(
                    dateKey + "T12:00:00"
                );

            const timetableDay =
                getTimetableDayName(
                    date,
                    calendar
                );

            const dayTimetable =
                timetable[timetableDay];

            if(!dayTimetable)
                return;

            dayTimetable.forEach(
                (
                    subjectId,
                    index
                ) => {

                    const status =
                        periods[index];

                    if(!subjectId)
                        return;

                    if(
                        status !== "attended"
                        &&
                        status !== "absent"
                    ) {
                        return;
                    }

                    if(!result[subjectId])
                        return;

                    result[subjectId].total++;

                    if(status === "attended") {

                        result[subjectId].attended++;

                    }
                    else {

                        result[subjectId].absent++;

                    }

                }
            );

        });

    return Object.values(result);

}