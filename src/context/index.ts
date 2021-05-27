import { createContext } from 'react';
export interface IData {
    buildings: any[];
    meetingRooms: any[];
    meetings: any[];
}
export interface IDataProvider {
    setData: (data: IData) => void;
    data: IData;
}
const initialState: IDataProvider = {
    setData: () => {},
    data: {
        buildings: [],
        meetingRooms: [],
        meetings: [],
    },
};
export const DataContext = createContext<IDataProvider>(initialState);
