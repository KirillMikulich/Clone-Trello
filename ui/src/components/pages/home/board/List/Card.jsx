import * as React from 'react';
import { Button, Paper, IconButton } from '@material-ui/core';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { Draggable } from 'react-beautiful-dnd';
import { Delete, Edit } from '@material-ui/icons';
import { EditControls } from '../EditControls/EditControls';

const useStyle = makeStyles((theme) => ({
    card: {
        padding: theme.spacing(1, 1, 1, 2),
        margin: theme.spacing(1),
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    btnConfirm: {
        background: '#0052CC',
        color: '#fff',
        '&:hover': {
            background: alpha('#0052CC', 0.75),
        },
    }
}));

export default function Card({sprint, index}) {
    const classes = useStyle();

    return (
        <Draggable draggableId={'sprint'+sprint.id.toString()} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                >
                    <Paper className={classes.card}>
                        <p>{sprint.name}</p>
                        <EditControls id={sprint.id} type="sprint"/>
                    </Paper>
                </div>
            )}
        </Draggable>
    );
}
