import * as React from 'react';
import { IconButton } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import ColumnService from '../../../../../service/columns';
import { useDispatch, useSelector } from 'react-redux';
import { setColumns } from '../../../../../store/actions/columns';
import SprintService from '../../../../../service/sprints';

const useStyle = makeStyles((theme) => ({
    deleteBtn: {
        width: '15px',
        height: '15px',
        color: '#0052CC'
    },
    icon:{
        fontSize: 20,
    }
}));

export function EditControls({id, type}) {
    const classes = useStyle();
    const dispatch = useDispatch();
    const boardId = useSelector((state) => state.boardId);

    async function loadColumns() {
        if(boardId !== null) {
            const column = await ColumnService.getAllColumns(boardId);
            if(column.length > 0){
                dispatch(setColumns([...column]));
            }
        }
    }

    async function onDelete(){
        if(type === 'card') {
            await ColumnService.deleteColumns(id);
        } else {
            await SprintService.deleteSprint(id);
        }
        await loadColumns();
    }

    async function onEditClick() {
        if(type === 'card') {

        } else {

        }
    }

    return (
        <div>
            <IconButton className={classes.deleteBtn} onClick={onEditClick}>
                <Edit className={classes.icon} />
            </IconButton>
            <IconButton className={classes.deleteBtn} onClick={onDelete}>
                <Delete className={classes.icon} />
            </IconButton>
        </div>
    );
}
