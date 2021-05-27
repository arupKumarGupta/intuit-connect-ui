import './AvailableRooms.scss';
import React from 'react';

export const AvailableRooms: React.FC<{ meetingRooms: any[] }> = ({
    meetingRooms = [],
}) => {
    const meetingContent = meetingRooms.map((meetingRoom) => {
        return (
            <div className="card" key={meetingRoom.id}>
                {meetingRoom.name} in Building {meetingRoom.building.name} in
                floor {meetingRoom.floor}
            </div>
        );
    });
    const content = meetingRooms.length ? (
        meetingContent
    ) : (
        <div>No Rooms Available for the selected time slot</div>
    );

    return (
        <div className="available-rooms">
            <h2>Available Meeting Rooms</h2>
            <div className="content">{content}</div>
        </div>
    );
};
