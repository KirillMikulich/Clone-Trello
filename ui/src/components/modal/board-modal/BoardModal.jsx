import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useSelector } from 'react-redux';
import DashBoardService from '../../../service/dashboard';
import { InputBase, Paper } from '@material-ui/core';
import { alpha, makeStyles } from '@material-ui/core/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsersCog, faTrashAlt, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import boardService from '../../../service/dashboard';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 600,
    bgcolor: 'lightgrey',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const useStyle = makeStyles((theme) => ({
    input: {
        margin: theme.spacing(1),
    },
    list: {
        listStyle: 'none',
        margin: 10,

    },
    item: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnConfirm: {
        background: '#0052CC',
        color: '#fff',
        '&:hover': {
            background: alpha('#0052CC', 0.75),
        },
    },
}));

export function BoardModal({open, handleClose, boardId, load}) {
    const user = useSelector(state => state.user);
    const [board, setBoard] = React.useState();

    const classes = useStyle();
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');

    React.useEffect(() => {
        if(open) loadBoard();
    }, [open]);

    async function loadBoard() {
        const board = await DashBoardService.getBoardById(boardId);
        if(board !== null){
            setBoard(board);
            setName(board.board.name);
        }
    }

    const handleOnChange = (e) => {
        setName(e.target.value);
    };

    const handleOnChangeEmail = (e) => {
        setEmail(e.target.value);
    };


    async function DeleteUser(userId) {
        await boardService.deleteUserForId(userId, boardId);
        await loadBoard();
    }

    async function changeName(){
        if (name.length > 0) {
            await boardService.changeName(boardId, name);
            await loadBoard();
            await load();
        }
    }

    async function addUser(){
        if(email.length > 0) {
            await boardService.addUserInBoard(email, boardId);
            await loadBoard();
        }
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Рекактирование доски
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Paper>
                            <InputBase
                                onChange={handleOnChange}
                                multiline
                                inputProps={{
                                    className: classes.input,
                                }}
                                fullWidth
                                value={name}
                            />
                        </Paper>

                        {
                            board?.users.length > 0 && <>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Добавленные пользователи
                                </Typography>
                                <Paper>

                                    <ul className={classes.list}>
                                        {
                                            board?.users.map (item => <li className={classes.item} key={item.id}>
                                                {item.email}
                                                <FontAwesomeIcon className="ico btn-ico" icon={faTrashAlt} onClick={() => DeleteUser(item.id)}/>
                                            </li>)
                                        }
                                    </ul>
                                </Paper></>
                        }

                    </Typography>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Добавить рользователя по email
                    </Typography>
                    <Paper >
                        <InputBase
                            onChange={handleOnChangeEmail}
                            multiline
                            fullWidth
                            inputProps={{
                                className: classes.input,
                            }}
                            value={email}

                        />
                    </Paper>
                    <Button className={classes.btnConfirm} onClick={addUser}>
                        Добавить
                    </Button>
                </div>
                <Button className={classes.btnConfirm} onClick={changeName}>
                    Сохранить
                </Button>
            </Box>
        </Modal>
    );
}
