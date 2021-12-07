import * as React from 'react';

import { Typography, InputBase, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Delete, Edit } from '@material-ui/icons';
import { EditControls } from '../EditControls/EditControls';
import ColumnService from '../../../../../service/columns';

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

export default function Title({columnId, title, type}) {
    const [newTitle, setNewTitle] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const classes = useStyle();

    React.useEffect(() => {
        setNewTitle(title);
    }, []);

    const handleOnChange = (e) => {
        if(e.target.value.length > 0){
            setNewTitle(e.target.value);
        }
    };

    const handleOnBlur = async () => {
        setOpen(false);
        try{
            await ColumnService.changeTitle(columnId, newTitle);
        }
        catch (e){
            setNewTitle(title);
        }
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
                        {newTitle}
                    </Typography>
                    <EditControls type={type} id={columnId}/>
                </div>
            )}
        </div>
    );
}
