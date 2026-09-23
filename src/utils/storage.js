const STORAGE_VERSION_KEY = "storageVersion";
const STORAGE_VERSION = 1;

const EMPTY_TIMETABLE = {
    Monday: [null, null, null, null, null, null],
    Tuesday: [null, null, null, null, null, null],
    Wednesday: [null, null, null, null, null, null],
    Thursday: [null, null, null, null, null, null],
    Friday: [null, null, null, null, null, null],
};

function createStore(key, fallback, options = {}) {
    const { validate = null } = options;

    return {
        load() {
            try {
                const raw = localStorage.getItem(key);
                if (raw === null) {
                    return fallback;
                }

                const parsed = JSON.parse(raw);

                if (validate && !validate(parsed)) {
                    return fallback;
                }

                return parsed;
            } catch {
                return fallback;
            }
        },

        save(value) {
            localStorage.setItem(key, JSON.stringify(value));
        },
    };
}

function isObject(value) {
    return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isValidTimetable(value) {
    if (!isObject(value)) {
        return false;
    }

    return Object.values(value).every(
        (day) => Array.isArray(day) && day.length === 6
    );
}

const subjectsStore = createStore("subjects", [], { validate: Array.isArray });
const timetableStore = createStore("timetable", EMPTY_TIMETABLE, {
    validate: isValidTimetable,
});
const calendarStore = createStore("calendar", {});
const attendanceStore = createStore("attendance", {});
const semesterStore = createStore("semester", { start: "", end: "" }, {
    validate: isObject,
});
const minimumAttendanceStore = createStore("minimumAttendance", {});

export function loadSubjects() {
    return subjectsStore.load();
}

export function saveSubjects(subjects) {
    subjectsStore.save(subjects);
}

export function loadTimetable() {
    return timetableStore.load();
}

export function saveTimetable(timetable) {
    timetableStore.save(timetable);
}

export function loadCalendar() {
    return calendarStore.load();
}

export function saveCalendar(calendar) {
    calendarStore.save(calendar);
}

export function loadAttendance() {
    return attendanceStore.load();
}

export function saveAttendance(attendance) {
    attendanceStore.save(attendance);
}

export function loadSemester() {
    return semesterStore.load();
}

export function saveSemester(data) {
    semesterStore.save(data);
}

export function loadMinimumAttendance() {
    return minimumAttendanceStore.load();
}

export function saveMinimumAttendance(data) {
    minimumAttendanceStore.save(data);
}

const migrations = [];

export function migrateStorage() {
    let storedVersion;

    try {
        storedVersion = Number(localStorage.getItem(STORAGE_VERSION_KEY)) || 0;
    } catch {
        storedVersion = 0;
    }

    if (storedVersion >= STORAGE_VERSION) {
        return;
    }

    for (const migration of migrations) {
        if (migration.version <= storedVersion) {
            continue;
        }

        migration.run();
        storedVersion = migration.version;
    }

    try {
        localStorage.setItem(
            STORAGE_VERSION_KEY,
            String(STORAGE_VERSION)
        );
    } catch {
        // Storage unavailable; skip version bookkeeping.
    }
}