import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    TimePicker as MUITimePicker,
} from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import React from 'react';
import './TimePicker.scss';
interface TimePickerProps {
    onChange: (time: MaterialUiPickersDate) => void;
    value?: string;
    ampm?: boolean;
}
export const TimePicker: React.FC<TimePickerProps> = ({
    value = new Date().toISOString(),
    onChange,
    ampm = false,
}) => {
    return (
        <div className="time-picker">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <MUITimePicker onChange={onChange} value={value} ampm={ampm} />
            </MuiPickersUtilsProvider>
        </div>
    );
};
