import React from 'react';
import { Paper, Typography, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Title from './Title';
import Card from './Card';
import { InputContainer } from '../Input/InputContainer';
import sprintService from '../../../../../service/sprints';

const useStyle = makeStyles((theme) => ({
    root: {
        minWidth: '300px',
        backgroundColor: '#EBECF0',
        marginLeft: theme.spacing(1),
    },
    cardContainer: {
        marginTop: theme.spacing(4),
    },
}));

export function List({columnId, title, index, sprints}) {
    const classes = useStyle();

    return (
        <Draggable draggableId={columnId.toString()} index={index}>
            {(provided) => (
                <div {...provided.draggableProps} ref={provided.innerRef}>
                    <Paper className={classes.root} {...provided.dragHandleProps}>
                        <CssBaseline />
                        <Title title={title} columnId={columnId} />
                        <Droppable droppableId={columnId.toString()}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={classes.cardContainer}
                                >
                                    {sprints.map((sprint, sprintIndex) => (
                                        <Card key={sprint.id} sprint={sprint} index={sprintIndex} />
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>

                        <InputContainer columnId={columnId} type="card" />
                    </Paper>
                </div>
            )}
        </Draggable>
    );
}
