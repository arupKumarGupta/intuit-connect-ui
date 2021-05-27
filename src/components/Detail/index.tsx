import './Detail.scss';
import React, { useContext } from 'react';
import { DataContext } from '../../context';
import { getTimeAndDuration } from '../../util';
const BuildingDetail: React.FC<{ buildings: any[] }> = ({ buildings = [] }) => {
    const content = buildings.map((building) => (
        <div key={building.id} className="card">
            <div className="card-title">{building.name}</div>
            <div className="content">
                {building.meetingRooms.length} Meeting Rooms
            </div>
        </div>
    ));
    return (
        <div className="buildings-container">
            <h2>Buildings</h2>
            <div className="list">{content}</div>
        </div>
    );
};

const MeetingRoomDetail: React.FC<{ meetingRooms: any[] }> = ({
    meetingRooms = [],
}) => {
    const content = meetingRooms.map((meetingRoom) => (
        <div key={meetingRoom.id} className="card large">
            <div className="card-title">{meetingRoom.name}</div>
            <div className="content">
                <div>
                    In Building {meetingRoom.building.name}, Floor #
                    {meetingRoom.floor}
                </div>
                <div>{meetingRoom.meetings.length} Meetings scheduled</div>
            </div>
        </div>
    ));
    return (
        <div className="meetingRooms-container">
            <h2>Meeting Rooms</h2>
            <div className="list">{content}</div>
        </div>
    );
};

const MeetingDetail: React.FC<{ meetings: any[] }> = ({ meetings = [] }) => {
    const remainingMeetings = meetings.filter((meeting) => {
        const date = getTimeAndDuration(meeting);
        return date.end.getTime() > new Date().getTime();
    });
    let content;
    if (remainingMeetings.length === 0) {
        content = 'No meetings scheduled';
    } else
        content = remainingMeetings.map((meeting) => {
            const { start, end } = getTimeAndDuration(meeting);
            return (
                <div key={meeting.id} className="card large">
                    <div className="card-title">{meeting.title}</div>
                    <div className="content">
                        <div>
                            Scheduled on {start.toLocaleString()} till{' '}
                            {end.toLocaleString()}
                        </div>
                        <div>
                            <div>Meeting Room details</div>
                            <div>
                                {' '}
                                Hosted in {meeting.meetingRoom.name}
                                {' In Building '}
                                {meeting.meetingRoom.building.name}, Floor #
                                {meeting.meetingRoom.floor}
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    return (
        <div className="meetings-container">
            <h2>Meeting Rooms</h2>
            <div className="list">{content}</div>
        </div>
    );
};

export const Detail: React.FC = () => {
    const {
        data: { buildings, meetings, meetingRooms },
    } = useContext(DataContext);

    return (
        <div className="details-container container">
            <BuildingDetail buildings={buildings} />
            <MeetingRoomDetail meetingRooms={meetingRooms} />
            <MeetingDetail meetings={meetings} />
        </div>
    );
};
