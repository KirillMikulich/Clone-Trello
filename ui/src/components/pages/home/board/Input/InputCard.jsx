import * as React from 'react';
import { Paper, InputBase, Button, IconButton } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles, alpha } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import ColumnService from '../../../../../service/columns';
import SprintService from '../../../../../service/sprints';
import { deleteColumns, setColumns } from '../../../../../store/actions/columns';
import boardService from '../../../../../service/dashboard';

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
        background: '#0052CC',
        color: '#fff',
        '&:hover': {
            background: alpha('#0052CC', 0.75),
        },
    },
    confirm: {
        margin: theme.spacing(0, 1, 1, 1),
    },
}));

export default function InputCard({ setOpen, columnId, type ,load}) {
    const [title, setTitle] = React.useState('');
    const user = useSelector(state => state.user);
    const classes = useStyle();
    const dispatch = useDispatch();
    const boardId = useSelector((state) => state.boardId);

    const handleOnChange = (e) => {
        setTitle(e.target.value);
    };

    async function loadColumns() {
        if(boardId !== null)  {
            const column = await ColumnService.getAllColumns(boardId);
            if(column.length > 0){
                dispatch(deleteColumns());
                dispatch(setColumns([...column]));
            }
        }
    }

    async function handleBtnConfirm(){
        if (type === 'card') {
            await SprintService.addSprint(columnId, title);
            setTitle('');
            setOpen(false);
        } else if (type === 'column'){
            await ColumnService.addColumn(boardId, title);
            setTitle('');
            setOpen(false);
        } else if(type === 'board') {
            await boardService.addBoard(user.user.id, true, title);
            await load();
        }

        await loadColumns();
    }

    function placeholder() {
        if (type === 'card') return 'Введите название спринта.';
        if (type === 'list') return 'Введите название столбца';
        if (type === 'board') return 'Введите название доски';
    }

    function titleText() {
        if (type === 'card') return 'Добавить спринт';
        if (type === 'list') return 'Добавить столбец';
        if (type === 'board') return 'Добавить доску';
    }


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
                        placeholder={placeholder()}
                    />
                </Paper>
            </div>
            <div className={classes.confirm}>
                <Button className={classes.btnConfirm} onClick={handleBtnConfirm}>
                    {titleText()}
                </Button>
                <IconButton onClick={() => setOpen(false)}>
                    <ClearIcon />
                </IconButton>
            </div>
        </div>
    );
}
