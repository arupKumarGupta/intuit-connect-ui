import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import classNames from 'classnames';
import React, { useState } from 'react';
import './Venue.scss';
interface VenueSelectOptions {
    label: string;
    value: string;
}
interface VenueSelectProps {
    label: string;
    options: VenueSelectOptions[];
    onOptionSelect: (event: any) => void;
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 150,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    })
);
export const VenueSelect: React.FC<VenueSelectProps> = ({
    label,
    options,
    onOptionSelect,
}) => {
    const classes = useStyles();
    const [selectedValue, setSelectedValue] = useState<string>('');
    const valueSelected = (e: any) => {
        setSelectedValue(e.target.value);
        onOptionSelect(e.target.value);
    };
    const id = `venue-select-${
        new Date().getTime() + Math.floor(Math.random() * 1000)
    }`;
    return (
        <div className={classNames('venue-selector', classes.formControl)}>
            <FormControl className={classes.formControl}>
                <InputLabel id={id}>{label}</InputLabel>
                <Select
                    labelId={id}
                    id="demo-simple-select-helper"
                    value={selectedValue}
                    onChange={valueSelected}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {options.map((option, idx) => (
                        <MenuItem
                            value={option.value}
                            key={`vs-${label}-${idx}`}
                        >
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};
