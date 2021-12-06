import React from "react";
import ColumnService from "../../../../service/columns";
import './board.scss';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { makeStyles } from '@material-ui/core/styles';
import { InputContainer } from './Input/InputContainer';
import { List } from './List/List';
import MoveService from '../../../../service/move';
import { useDispatch, useSelector } from 'react-redux';
import { deleteColumns, setColumns } from '../../../../store/actions/columns';

const useStyle = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        background: 'green',
        width: '100%',
        overflowY: 'auto',
    },
    listContainer: {
        display: 'flex',
    },
    columns:{
        display: 'flex',
        flexDirection: 'row',
        maxWidth: '90%',
        width: '100%',
        overflowX: 'scroll'
    }
}));

export default function Board() {
    const boardId = useSelector((state) => state.boardId);
    const columns = useSelector((state) => state.columns);
    const [title, setTitle] = React.useState('');
    const classes = useStyle();
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(deleteColumns());
        loadColumns();
    }, [boardId]);

    async function loadColumns() {
        if(boardId !== null) {
            const column = await ColumnService.getAllColumns(boardId);
            if(column.length > 0){
                dispatch(setColumns([...column]));
            }
        }
    }

    async function addColumn(){
        await ColumnService.addColumn(boardId, title);
        setTitle('');
        await loadColumns();
    }

    async function deleteColumn(columnId){
        await ColumnService.deleteColumns(columnId);
        await loadColumns();
    }

    async function onDragEnd(result) {
       const { destination, source, draggableId, type } = result;

        if (!destination)  return;

        if (type === 'list') {

            //двигаються листы

            const newColumnsList = JSON.parse(JSON.stringify(columns));

            const column = newColumnsList.find(item => item.id.toString() === draggableId.replace('column','').replace('sprint',''));
            const index = newColumnsList.indexOf(column);

            newColumnsList[index] = newColumnsList[destination.index.replace('column','').replace('sprint','')];
            newColumnsList[destination.index.replace('column','').replace('sprint','')] = column;

            dispatch(setColumns(newColumnsList)); // - что не баговал интерйес, при получении одних и тех же данных
            //он не перерисуеться


            MoveService.swipeColumns(draggableId.replace('column','').replace('sprint',''), columns[destination.index].id)
                .then(res => {
                    loadColumns();
                });
            return;
        }


        if (source.droppableId.replace('column','').replace('sprint','') === destination.droppableId.replace('column','').replace('sprint','')) {
            console.log(source.droppableId.replace('column','').replace('sprint',''));
            const newColumnsList = JSON.parse(JSON.stringify(columns));
            const column = newColumnsList.find(item => item.id.toString() === source.droppableId.replace('column','').replace('sprint',''));

            const sprintsCopy = JSON.parse(JSON.stringify(column.sprints));

            column.sprints.splice(source.index, 1);
            column.sprints.splice(destination.index, 0, sprintsCopy[source.index]);

            dispatch(setColumns(newColumnsList));
            MoveService.swipeSprints(destination.index, source.index, destination.droppableId.replace('column','').replace('sprint',''))
                .then(res => {
                    loadColumns();
                });
        } else {

            const newColumnsList = JSON.parse(JSON.stringify(columns));
            const columnDrag = newColumnsList.find(item => item.id.toString() === destination.droppableId.replace('column','').replace('sprint',''));
            const columnDrop = newColumnsList.find(item => item.id.toString() === source.droppableId.replace('column','').replace('sprint',''));
            columnDrag.sprints.splice(destination.index +1, 0, columnDrop.sprints[source.index]);
            columnDrop.sprints.splice(source.index, 1);
            dispatch(setColumns(newColumnsList));

            MoveService.moveSprintToColumn(draggableId.replace('column','').replace('sprint',''), destination.droppableId.replace('column','').replace('sprint',''), destination.index)
                .then(res => {
                    loadColumns();
                });
        }
    };

  return(
    <div className={classes.columns}>
        <DragDropContext className={columns?.length !== 0 ? "columns-container": ''} onDragEnd={onDragEnd}>
            <Droppable droppableId="app" type="list" direction="horizontal">
                {(provided) => (
                    <div className={classes.listContainer}
                         ref={provided.innerRef}
                         {...provided.droppableProps}>
                         {columns?.map((item, index) => {
                            return <List key={item.id} columnId={item.id} title={item.name} index={index} sprints={item.sprints}/>;
                         })}
                        <InputContainer type="list" />
                        {provided.placeholder}
                    </div>
                    )}
            </Droppable>
        </DragDropContext>
    </div>
  );
}
