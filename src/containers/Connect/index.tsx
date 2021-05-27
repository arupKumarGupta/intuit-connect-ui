import React, { useEffect, useMemo, useState } from 'react';
import { Loader, Overlay } from '../../common';
import { Logo, Detail } from '../../components';
import Nomad from '../../assets/nomad.png';
import './Connect.scss';
import { NewMeeting } from '../NewMeeting';
import { DataContext, IData, IDataProvider } from '../../context';
import { useLazyQuery } from '@apollo/client';
import { Buildings } from '../../api';
export const Connect: React.FC = () => {
    const [data, setData] = useState<IData>({
        buildings: [],
        meetingRooms: [],
        meetings: [],
    });

    const [loadData, { data: queryData, loading }] = useLazyQuery(Buildings, {
        fetchPolicy: 'no-cache',
    });
    useEffect(() => {
        loadData();
    }, []);
    useEffect(() => {
        if (queryData) {
            const { Buildings } = queryData;
            const data: any = {
                buildings: [],
                meetings: [],
                meetingRooms: [],
            };

            Buildings.forEach((building: any) => {
                data.buildings = [...data.buildings, building];
                data.meetingRooms = [
                    ...data.meetingRooms,
                    ...building.meetingRooms,
                ];
                building.meetingRooms.forEach((meetingRoom: any) => {
                    data.meetings = [...data.meetings, ...meetingRoom.meetings];
                });
            });
            setData(data);
        }
    }, [queryData, loading]);

    const providerValue: IDataProvider = useMemo(
        () => ({ data, setData }),
        [data, setData]
    );

    const [show, setShow] = useState<boolean>(false);
    const toggleOverlay = () => {
        setShow(!show);
    };

    const scheduleMeeting = async (meetingData: any) => {
        toggleOverlay();
        loadData();
    };

    if (loading) {
        return (
            <Overlay show={loading} showCloseButton={false}>
                <Loader
                    containerClasses={['intuit-loader']}
                    color="#0D9D07"
                    secondaryColor="#870afc"
                    height={100}
                    width={100}
                />
            </Overlay>
        );
    }
    return (
        <DataContext.Provider value={providerValue}>
            <div className="intuit-connect">
                <div className="flex space-between">
                    <Logo />
                    <button
                        className="button primary new-meet-primary"
                        onClick={toggleOverlay}
                    >
                        New Meeting
                    </button>
                </div>
                <div className="desc flex space-between">
                    <div className="text">
                        Collaborate with people, realise your ideas in a smart
                        and seamless way!
                    </div>
                    <div className="nomad">
                        <img src={Nomad} alt="nomad.png" />
                    </div>
                </div>
                <Detail />

                <Overlay show={show} toggle={toggleOverlay}>
                    <NewMeeting
                        cancelClicked={toggleOverlay}
                        submit={scheduleMeeting}
                    />
                </Overlay>
            </div>
        </DataContext.Provider>
    );
};

export default Connect;
