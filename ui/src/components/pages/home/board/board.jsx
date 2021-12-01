import React from "react";
import ColumnService from "../../../../service/columns";
import './board.scss';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { makeStyles } from '@material-ui/core/styles';
import { InputContainer } from './Input/InputContainer';
import { List } from './List/List';
import MoveService from '../../../../service/move';

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


export default function Board({boardId}) {
    const [columns, setColumns] = React.useState([]);
    const [title, setTitle] = React.useState('');
    const classes = useStyle();

    React.useEffect(() => {
        loadColumns();
    }, [boardId]);

    async function loadColumns() {
        const column = await ColumnService.getAllColumns(boardId);
        if(column.length > 0){
          setColumns([...column]);
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

            const column = newColumnsList.find(item => item.id.toString() === draggableId);
            const index = newColumnsList.indexOf(column);

            newColumnsList[index] = newColumnsList[destination.index];
            newColumnsList[destination.index] = column;

            setColumns(newColumnsList); // - что не баговал интерйес, при получении одних и тех же данных
            //он не перерисуеться


            MoveService.swipeColumns(draggableId, columns[destination.index].id)
                .then(res => {
                    loadColumns();
                });
            return;
        }


        if (source.droppableId === destination.droppableId) {
            const newColumnsList = JSON.parse(JSON.stringify(columns));
            const column = newColumnsList.find(item => item.id.toString() === source.droppableId);

            const sprintsCopy = JSON.parse(JSON.stringify(column.sprints));

            column.sprints.splice(source.index, 1);
            column.sprints.splice(destination.index, 0, sprintsCopy[source.index]);

            setColumns(newColumnsList);

            MoveService.swipeSprints(destination.index, source.index)
                .then(res => {
                    loadColumns();
                });
        } else {
            const newColumnsList = JSON.parse(JSON.stringify(columns));
            const columnDrag = newColumnsList.find(item => item.id.toString() === destination.droppableId);
            const columnDrop = newColumnsList.find(item => item.id.toString() === source.droppableId);
            columnDrag.sprints.splice(destination.index +1, 0, columnDrop.sprints[source.index]);
            columnDrop.sprints.splice(source.index, 1);
            setColumns(newColumnsList);

            MoveService.moveSprintToColumn(draggableId, destination.droppableId, destination.index)
                .then(res => {
                    loadColumns();
                });
        }
    };

  return(
    <div className={classes.columns}>
        <DragDropContext className={columns.length !== 0 ? "columns-container": ''} onDragEnd={onDragEnd}>
            <Droppable droppableId="app" type="list" direction="horizontal">
                {(provided) => (
                    <div className={classes.listContainer}
                         ref={provided.innerRef}
                         {...provided.droppableProps}>
                         {columns.map((item, index) => {
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
