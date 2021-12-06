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


export function InputContainer({ columnId, type, load }) {
    const classes = useStyle();
    const [open, setOpen] = React.useState(false);

    function titleText() {
        if (type === 'card') return '+ Добавить спринт';
        if (type === 'list') return '+ Добавить столбец';
        if (type === 'board') return '+ Добавить доску';
    }

    return (
        <div className={classes.root}>
            <Collapse in={open}>
                <InputCard setOpen={setOpen} columnId={columnId} type={type} load={load}/>
            </Collapse>
            <Collapse in={!open}>
                <Paper
                    className={classes.addCard}
                    elevation={0}
                    onClick={() => setOpen(!open)}
                >
                    <Typography>
                        {titleText()}
                    </Typography>
                </Paper>
            </Collapse>
        </div>
    );
}
