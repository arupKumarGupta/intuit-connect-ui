import React, { useContext, useEffect, useState } from 'react';
import { VenueSelect, AvailableRooms, Time } from '../../components';

import LocationPinIcon from '../../assets/location-pin.png';
import './NewMeeting.scss';
import { DataContext } from '../../context';
import { getFreeMeetingRooms, isDateRangeValid } from '../../util';
import { TextField } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import { createMeeting } from '../../api';
import { Loader, Overlay } from '../../common';

interface NewMeetingProps {
    cancelClicked: () => void;
    submit: (meeting: any) => void;
}
const filterMeetingForBuilding = (meetingsRooms: any[], key: string): any[] =>
    meetingsRooms
        .filter(
            (meetingRoom: any) => meetingRoom.building.id === key || key === ''
        )
        .map((m: any) => ({ label: m.name, value: m.id, meetingRoom: m }));

export const NewMeeting: React.FC<NewMeetingProps> = ({
    cancelClicked,
    submit,
}) => {
    const { data } = useContext(DataContext);
    const [showLoaderOverlay, setOverlay] = useState<boolean>(false);
    const [scheduleMeeting] = useMutation(createMeeting);
    const [buildingsOptions, setBuildingsOptions] = useState<any[]>([]);
    const [meetingRoomsOptions, setMeetingRoomsOptions] = useState<any[]>([]);
    const [selectedBuilding, setSelectedBuilding] = useState('');
    const [selectedMeetingRoom, setSelectedMeetingRoom] = useState('');
    const [title, setTitle] = useState<string>('');
    const [availableMeetingRooms, setFreeMeetingRooms] = useState<any[]>([]);
    const [schedule, setSchedule] = useState<any>({
        start: '',
        end: '',
        date: '',
    });

    useEffect(() => {
        if (!schedule.date) {
            return;
        }
        if (isDateRangeValid(schedule)) {
            setFreeMeetingRooms(
                getFreeMeetingRooms(data.meetingRooms, schedule)
            );
        }
    }, [schedule]);
    const onScheduleSet = (schedule: any) => {
        setSchedule(schedule);
        if (isDateRangeValid(schedule)) {
            setMeetingRoomsOptions(
                getFreeMeetingRooms(data.meetingRooms, schedule)
            );
        }
    };
    const onScheduleClicked = async () => {
        setOverlay(true);
        const meetingData = {
            title,
            date: schedule.date,
            endTime: schedule.endTime,
            startTime: schedule.startTime,
            meetingRoom: selectedMeetingRoom,
        };
        if (!isDateRangeValid({ ...meetingData })) {
            return alert('Invalid Date Range');
        }
        if (!meetingData.title || !meetingData.meetingRoom) {
            return alert(
                'Required Fields : title, Meeting Room, date, start and end time'
            );
        }

        const d = await scheduleMeeting({
            variables: {
                ...meetingData,
                meetingRoomId: meetingData.meetingRoom,
            },
        });
        setOverlay(false);
        submit({
            ...meetingData,
            meetingRoomId: meetingData.meetingRoom,
        });
    };
    useEffect(() => {
        if (!data) {
            return;
        }
        if (!schedule.date) {
            return;
        }
        const { buildings } = data;

        const buildingOptions = buildings.map((building) => ({
            label: building.name,
            value: building.id,
            building,
        }));
        setBuildingsOptions(buildingOptions);
        data.meetingRooms.filter(
            (mR) =>
                mR.building.id === selectedBuilding || selectedBuilding === ''
        );
        setMeetingRoomsOptions(
            filterMeetingForBuilding(
                isDateRangeValid(schedule)
                    ? getFreeMeetingRooms(data.meetingRooms, schedule)
                    : data.meetingRooms,
                selectedBuilding
            )
        );
    }, [selectedBuilding, schedule, data]);

    return (
        <div className="new-meeting">
            <div className="form-container">
                <div className="new-meeting-header">Schedule new meeting</div>
                <TextField
                    className="meeting-title"
                    placeholder={'Meeting Title'}
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <Time onScheduleSet={onScheduleSet} />

                <div className="venue-selector">
                    <img src={LocationPinIcon} width={30} alt="location"></img>
                    <VenueSelect
                        label={'Building'}
                        options={buildingsOptions}
                        onOptionSelect={setSelectedBuilding}
                    />
                    <VenueSelect
                        label={'Meeting Room'}
                        options={meetingRoomsOptions}
                        onOptionSelect={setSelectedMeetingRoom}
                    />
                </div>
                <div className="btn-group flex-container">
                    <button className="button link" onClick={cancelClicked}>
                        Cancel
                    </button>
                    <button
                        className="button primary"
                        onClick={onScheduleClicked}
                    >
                        Schedule
                    </button>
                </div>
                <Overlay show={showLoaderOverlay} showCloseButton={false}>
                    <Loader width={100} height={100} />
                </Overlay>
            </div>
            <div className="available-room-container">
                <AvailableRooms meetingRooms={availableMeetingRooms} />
            </div>
        </div>
    );
};
