import React from 'react';
import { DatePicker as MUIDatePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import './DatePicker.scss';
interface DatePickerProps {
    onChange: (date: any) => void;
    value?: String;
    dateFormat?: string;
    disablePast?: boolean;
    disableFuture?: boolean;
}
export const DatePicker: React.FC<DatePickerProps> = ({
    onChange,
    dateFormat = 'dd/MM/yyyy',
    disablePast = false,
    disableFuture = false,
    value = new Date().toISOString(),
}) => {
    return (
        <div className="date-picker">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <MUIDatePicker
                    onChange={onChange}
                    value={value}
                    disablePast={disablePast}
                    disableFuture={disableFuture}
                    format={dateFormat}
                    animateYearScrolling
                />
            </MuiPickersUtilsProvider>
        </div>
    );
};
