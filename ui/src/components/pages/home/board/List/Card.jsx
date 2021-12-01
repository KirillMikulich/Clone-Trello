import * as React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Draggable } from 'react-beautiful-dnd';

const useStyle = makeStyles((theme) => ({
    card: {
        padding: theme.spacing(1, 1, 1, 2),
        margin: theme.spacing(1),
    },
}));

export default function Card({sprint, index}) {
    const classes = useStyle();

    return (
        <Draggable draggableId={sprint.id.toString()} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                >
                    <Paper className={classes.card}>{sprint.name}</Paper>
                </div>
            )}
        </Draggable>
    );
}