import * as React from 'react';

import { Typography, InputBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const useStyle = makeStyles((theme) => ({
    editableTitleContainer: {
        margin: theme.spacing(1),
        display: 'flex',
    },
    editableTitle: {
        flexGrow: 1,
        fontSize: '1.2rem',
        fontWeight: 'bold',
    },
    input: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        margin: theme.spacing(1),
        '&:focus': {
            background: '#ddd',
        },
    },
}));

export default function Title({columnId, title}) {
    const [newTitle, setNewTitle] = React.useState();
    const [open, setOpen] = React.useState(false);
    const classes = useStyle();

    const handleOnChange = (e) => {
        setNewTitle(e.target.value);
    };

    const handleOnBlur = () => {
        //updateListTitle(newTitle, listId); - add титле
        setOpen(false);
    };

    return (
        <div>
            {open ? (
                <div>
                    <InputBase
                        onChange={handleOnChange}
                        autoFocus
                        value={newTitle}
                        inputProps={{
                            className: classes.input,
                        }}
                        fullWidth
                        onBlur={handleOnBlur}
                    />
                </div>
            ) : (
                <div className={classes.editableTitleContainer}>
                    <Typography
                        onClick={() => setOpen(!open)}
                        className={classes.editableTitle}
                    >
                        {title}
                    </Typography>
                    <MoreHorizIcon />
                </div>
            )}
        </div>
    );
}