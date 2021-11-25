import React from "react";
import ColumnService from "../../../../service/columns";
import './board.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Sprints } from '../sprints/sprints';

export default function Board({boardId}) {
  const [columns, setColumns] = React.useState([]);
  const [title, setTitle] = React.useState('');

  React.useEffect(() => {
    loadColumns();
  }, [boardId]);

  async function loadColumns() {
    const column = await ColumnService.getAllColumns(boardId);
    if(column){
      setColumns([...column]);
    }
  }

  async function addColumn(){
    await ColumnService.addColumn(boardId, title);
    setTitle('');
    loadColumns();
  }

  async function deleteColumn(columnId){
    await ColumnService.deleteColumns(columnId);
    loadColumns();
  }

  return(
    <div className="columns">
      <div className="add-columns">
        <input className="input-textarea" type="text" onChange={ e => setTitle(e.target.value) }  value={title} />
        <div className="ml10 button blue-button" onClick={addColumn}>Добавить</div>
      </div>
      <div className={columns.length !== 0 ? "columns-container": ''}>
        {
          columns && columns.map(item =>
            <div className="column" key={item.id+"--"+item.order}>
              <div className="column-container">
                <div className="title">
                  {item.name}
                  <FontAwesomeIcon className="ico btn-ico" icon={faTrashAlt} onClick={() => deleteColumn(item.id)}/>
                </div>
                <Sprints columnId={item.id} key={item.id}></Sprints>
              </div>
            </div>)
        }
      </div>
    </div>
  );
}
