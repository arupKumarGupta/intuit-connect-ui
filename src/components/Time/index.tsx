import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import React, { useEffect, useState } from 'react';
import { DatePicker, TimePicker } from '../../common';
import './Time.scss';
import ClockIcon from '../../assets/clock.png';
interface Schedule {
    startTime: string;
    endTime: string;
    date: string;
}
interface TimeProps {
    onScheduleSet: (schedule: Schedule) => void;
}
export const Time: React.FC<TimeProps> = ({ onScheduleSet }) => {
    const currrentDate = new Date();
    const endTime = new Date();
    endTime.setMinutes(currrentDate.getMinutes() + 16);
    const [meetingDate, setMeetingDate] = useState<string>(
        currrentDate.toISOString()
    );
    const [meetingStartTime, setMeetingStartTime] = useState<string>(
        currrentDate.toISOString()
    );
    const [meetingEndTime, setMeetingEndTime] = useState<string>(
        endTime.toISOString()
    );

    useEffect(() => {
        const parsedDate = new Date(meetingDate);
        console.log(parsedDate);
        const parsedStarTime = new Date(meetingStartTime);
        const parsedEndTime = new Date(meetingEndTime);
        onScheduleSet({
            date: `${parsedDate.getDate()}/${
                parsedDate.getMonth() + 1
            }/${parsedDate.getFullYear()}`,
            startTime: `${parsedStarTime.getHours()}:${parsedStarTime.getMinutes()}`,
            endTime: `${parsedEndTime.getHours()}:${parsedEndTime.getMinutes()}`,
        });
    }, [meetingDate, meetingStartTime, meetingEndTime]);

    const dateChange = (date: Date) => setMeetingDate(date.toISOString());
    const startTimeChange = (time: MaterialUiPickersDate) =>
        time && setMeetingStartTime(time.toISOString());
    const endTimeChange = (time: MaterialUiPickersDate) =>
        time && setMeetingEndTime(time.toISOString());

    return (
        <div className="intuit-time-scheduler">
            <img src={ClockIcon} width={30} alt="clock" />
            <DatePicker onChange={dateChange} value={meetingDate} />
            <div className="start-and-end">
                <TimePicker
                    onChange={startTimeChange}
                    value={meetingStartTime}
                />
                <span>-</span>
                <TimePicker onChange={endTimeChange} value={meetingEndTime} />
            </div>
        </div>
    );
};
