import React from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { InputBase, MenuItem, Paper, Select } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import DashBoardService from '../../../service/dashboard';
import boardService from '../../../service/dashboard';
import SprintService from '../../../service/sprints';
import { setBoardAction } from '../../../store/actions/board';

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
    overflowY: 'scroll'
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
        marginTop: '5px',
        '&:hover': {
            background: alpha('#0052CC', 0.75),
        },
    },
    selectBox: {
        width: '100%'
    },
    userList: {
        listStyle: 'none',
        display: 'flex',
        flexDirection: 'column'
    },
    userItem: {
        padding: '10px',
        marginBottom: '5px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: 'white'
    },
    who: {
        padding: '5px',
    },
    comment: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
}));

export function SprintModal({open, handleClose, sprintId}) {
    const boardId = useSelector((state) => state.boardId);
    const user = useSelector((state) => state.user);
    const [sprint, setSprint] = React.useState();

    const classes = useStyle();
    const [name, setName] = React.useState('');

    const [selectData, setSelectData] = React.useState([]);

    const [addedUser, setAddedUser] = React.useState('');

    const dispatch = useDispatch();

    const [comment, setComment] = React.useState('');

    React.useEffect(() => {
        setSelectData([]);
        if(open) loadBoard();
    }, [open]);

    React.useEffect(() => {
        if(sprint){
            let arr = []
            sprint.users?.forEach(item => {
                if(sprint.participant.filter( per=> per.id === item.id).length === 0)
                {
                    arr.push(item);
                }
            });

            setSelectData(arr);
        }
    }, [sprint]);

    const handleChange = (event) => {
        setAddedUser(event.target.value);
    };

    async function loadBoard() {
        setSelectData([]);
        const sprints = await SprintService.getSprintInfo(boardId, sprintId);
        if(sprints !== null){
            setSprint(sprints);
            setName(sprints.sprint.name);
        }
    }

    const handleOnChange = (e) => {
        setName(e.target.value);
    };

    const handleOnChangeComment = (e) => {
        setComment(e.target.value);
    };

    async function addUser() {
        await SprintService.addUserInSprint(addedUser, sprintId);
        await loadBoard();
    }

    async function deleteUser(id) {
        await SprintService.deleteUser(id, sprintId);
        await loadBoard();
    }

    async function saveClick() {
        await SprintService.changeName(sprintId, name);
        await loadBoard();
        const br = boardId;
        dispatch(setBoardAction(0));
        dispatch(setBoardAction(boardId));
    }


    async function addComment(){
        if(comment.length > 0) {
            await SprintService.addComment(comment,user.user.id, sprintId);
            await loadBoard();
            setComment('');
        }
    }

    async function deleteComment(id){
        await SprintService.deleteComment(id);
        await loadBoard();
    }

    return (
        <Modal  open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
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
                            sprint?.participant.length > 0 && <>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Добавленные пользователи
                                </Typography>
                                <Paper>

                                    <ul className={classes.list}>
                                        {
                                            sprint?.participant.map(item => <li className={classes.item} key={item.id}>
                                                {item.email}
                                                <FontAwesomeIcon className="ico btn-ico" icon={faTrashAlt} onClick={() => deleteUser(item.id)}/>
                                            </li>)
                                        }
                                    </ul>
                                </Paper></>
                        }

                    </Typography>
                    {
                        selectData.length > 0 && <><Typography id="modal-modal-title" variant="h6" component="h2">
                            Добавить пользователя
                        </Typography>
                            <Paper className={classes.selectBox}>
                                <Select
                                    className={classes.selectBox}
                                    value={addedUser}
                                    onChange={handleChange}>
                                    {
                                        selectData.map(select =>
                                            <MenuItem key={select.id}
                                                      value={select.id}>
                                                {select.email}
                                            </MenuItem>)
                                    }
                                </Select>
                            </Paper>
                            <Button className={classes.btnConfirm} onClick={addUser}>
                                Добавить
                            </Button>
                        </>

                    }

                    {
                        sprint?.comments.length > 0 &&
                             <>
                                 <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Комментарии
                                 </Typography>
                                 <ul className={classes.userList}>
                                     {
                                         sprint?.comments.map(item =>
                                             <li className={classes.userItem} key={item.id}>
                                                 <div className={classes.who}>
                                                     {
                                                         user.user.id == item.userId ?
                                                             'Вы'
                                                             :
                                                             sprint?.users.find(us => us.id == item.userId).email
                                                     }
                                                 </div>
                                                 <div className={classes.comment}>
                                                     {item.comment}
                                                     <FontAwesomeIcon className="ico btn-ico" icon={faTrashAlt} onClick={() => deleteComment(item.id)}/>

                                                 </div>
                                                </li>)
                                     }
                                 </ul>
                             </>
                    }



                    <Paper className="mt20 mb10">
                        <InputBase
                            onChange={handleOnChangeComment}
                            multiline
                            inputProps={{
                                className: classes.input,
                            }}
                            fullWidth
                            value={comment}
                        />
                    </Paper>

                    <Button className={classes.btnConfirm} onClick={addComment}>
                        Добавить комеентарий
                    </Button>

                </div>
                <Button className={classes.btnConfirm}  onClick={saveClick}>
                    Сохранить
                </Button>
            </Box>
        </Modal>
    );
}
