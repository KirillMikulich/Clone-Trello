import * as React from 'react';
import { Paper, Typography, Collapse } from '@material-ui/core';
import { makeStyles, alpha  } from '@material-ui/core/styles';
import InputCard from './InputCard';

const useStyle = makeStyles((theme) => ({
    root: {
        width: '300px',
        marginTop: theme.spacing(1),
    },
    addCard: {
        padding: theme.spacing(1, 1, 1, 2),
        margin: theme.spacing(0, 1, 1, 1),
        background: '#EBECF0',
        '&:hover': {
            backgroundColor: alpha('#000', 0.25),
        },
    },
}));

export function InputContainer({ listId, type }) {
    const classes = useStyle();
    const [open, setOpen] = React.useState(false);
    return (
        <div className={classes.root}>
            <Collapse in={open}>
                <InputCard setOpen={setOpen} listId={listId} type={type} />
            </Collapse>
            <Collapse in={!open}>
                <Paper
                    className={classes.addCard}
                    elevation={0}
                    onClick={() => setOpen(!open)}
                >
                    <Typography>
                        {type === 'card' ? '+ Добавить спринт' : '+ Добавить столбец'}
                    </Typography>
                </Paper>
            </Collapse>
        </div>
    );
}
