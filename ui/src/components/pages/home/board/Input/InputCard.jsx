import * as React from 'react';
import { Paper, InputBase, Button, IconButton } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles, alpha } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
    card: {
        width: '280px',
        margin: theme.spacing(0, 1, 1, 1),
        paddingBottom: theme.spacing(4),
    },
    input: {
        margin: theme.spacing(1),
    },
    btnConfirm: {
        background: '#5AAC44',
        color: '#fff',
        '&:hover': {
            background: alpha('#5AAC44', 0.75),
        },
    },
    confirm: {
        margin: theme.spacing(0, 1, 1, 1),
    },
}));

export default function InputCard({ setOpen, listId, type }) {
    const [title, setTitle] = React.useState('');
    const classes = useStyle();

    const handleOnChange = (e) => {
        setTitle(e.target.value);
    };

    const handleBtnConfirm = () => {
        if (type === 'card') {
            //addMoreCard(title, listId);
            setTitle('');
            setOpen(false);
        } else {
            //addMoreList(title);
            setTitle('');
            setOpen(false);
        }
    };


    return (
        <div>
            <div>
                <Paper className={classes.card}>
                    <InputBase
                        onChange={handleOnChange}
                        multiline
                        onBlur={() => setOpen(false)}
                        fullWidth
                        inputProps={{
                            className: classes.input,
                        }}
                        value={title}
                        placeholder={
                            type === 'card'
                                ? 'Введите название спринта.'
                                : 'Введите название столбца'
                        }
                    />
                </Paper>
            </div>
            <div className={classes.confirm}>
                <Button className={classes.btnConfirm} onClick={handleBtnConfirm}>
                    {type === 'card' ? 'Добавить спринт' : 'Добавить столбец'}
                </Button>
                <IconButton onClick={() => setOpen(false)}>
                    <ClearIcon />
                </IconButton>
            </div>
        </div>
    );
}