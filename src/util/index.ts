interface Time {
    date: string;
    startTime: string;
    endTime: string;
}

interface ITimeAndDuration {
    start: Date;
    end: Date;
    duration: number;
}
interface IBuilding {
    id: number;
    name: string;
    meetingRooms: IMeetingRoom[];
}
interface IMeeting {
    id: number;
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    meetingRoom: IMeetingRoom;
}
interface IMeetingRoom {
    id: number;
    name: string;
    floor: number;
    building: IBuilding;
    meetings: IMeeting[];
}

export function splitMapToInt(source: string, splitter: string = ':') {
    return source.split(splitter).map((v) => parseInt(v));
}
export function createDate(
    day: number,
    month: number,
    year: number,
    hr: number,
    min: number
) {
    const date = new Date();
    date.setFullYear(year);
    date.setMonth(month);
    date.setDate(day);
    date.setHours(hr);
    date.setMinutes(min);
    date.setSeconds(0);
    return date;
}

export function getTimeAndDuration(time: Time): ITimeAndDuration {
    const { date, startTime, endTime } = time;
    const [startHrs, startMins] = splitMapToInt(startTime);
    const [endHrs, endMins] = splitMapToInt(endTime);
    const [day, month, year] = splitMapToInt(date, '/');

    const startDate = createDate(day, month - 1, year, startHrs, startMins);
    const endDate = createDate(day, month - 1, year, endHrs, endMins);

    return {
        start: startDate,
        end: endDate,
        duration: endDate.getTime() - startDate.getTime(),
    };
}
export function sortDates(dates: ITimeAndDuration[]) {
    return dates.sort((prev, curr) => {
        const prevMillis = prev.start.getTime();
        const currMillis = curr.start.getTime();
        if (prevMillis < currMillis) return -1;
        if (prevMillis === currMillis) return 0;
        return 1;
    });
}
const compareStringDates = (srcDate: string, compareDate: string): boolean => {
    const [sDay, sMon, sYr] = splitMapToInt(srcDate);
    const [cDay, cMon, cYr] = splitMapToInt(srcDate);
    return sDay === cDay && sMon === cMon && sYr === cYr;
};
/* 1. Meeting Room not available
    filter meetings scheduled for the given date
    if not meetings available --> schedule the meeting
    else
    foreach meeting in a meeting room
        date is same
            i. meeting cannot be scheduled if
                a. at the same time
                b. duration is larger that free slot
                c. A meeting already scheduled with duration greater that the allowed one and give time comes inside that time span
            ii. meeting can be scheduled
        date is not same
            ignore -- meeting cannot be scheduled on the date other that given date.
*/
export function getFreeMeetingRooms(
    meetingRooms: IMeetingRoom[],
    meetingToSchedule: IMeeting
) {
    const scheduleAt: ITimeAndDuration = getTimeAndDuration(meetingToSchedule);
    const availableMeetingRooms = meetingRooms.filter((meetingRoom) => {
        const { meetings = [] } = meetingRoom;
        if (meetings.length === 0) {
            // schedule a meeting right away as no check is required
            return true;
        }
        const meetingsWithSameDate = meetings.filter((meeting: IMeeting) =>
            compareStringDates(meeting.date, meetingToSchedule.date)
        );
        if (meetingsWithSameDate.length === 0) {
            return true;
        }
        const meetingsSlots: ITimeAndDuration[] = sortDates([
            scheduleAt,
            ...meetingsWithSameDate.map((m) => getTimeAndDuration(m)),
        ]);
        const overlap: boolean = meetingsSlots.reduce(
            (res: boolean, current, idx, slots) => {
                if (idx === 0) return res;
                const prev = slots[idx - 1];
                res = prev.end.getTime() > current.start.getTime();
                return res;
            },
            false
        );
        return !overlap;
    });
    return availableMeetingRooms;
}

export const isDateRangeValid = (dateObj: Time): boolean => {
    return getTimeAndDuration(dateObj).duration / (1000 * 60) > 15;
};
