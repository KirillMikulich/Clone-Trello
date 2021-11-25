import React from "react";

import { useSelector } from 'react-redux';
import boardService from '../../../../service/dashboard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsersCog, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import './side-menu.scss';

export default function SideMenu({selectedBoardIs ,setSelectedBoardId}){
  const user = useSelector(state => state.user);
  const [boards, setBoards] = React.useState(null);

  const [name, setName] = React.useState('');



  React.useEffect(() => {
    LoadMyDashBoard();
  },[user]);

  async function LoadMyDashBoard(){
    if(user !== null && user.user !== null){
      const board = await boardService.getUserDashBoard(user.user.id);

      if(board){
        setBoards([...board]);
      }
    }
  }

  async function deleteBoard(id){
    setSelectedBoardId(null);
    await boardService.deleteBoard(id);
    LoadMyDashBoard();
  }

  async function addNewBoard(){
    if(user !== null && user.user !== null){
      await boardService.addBoard(user.user.id, true, name);
      setName('');
      LoadMyDashBoard();
    }
  }

  return(
    <div className="board">
      {
        boards &&
          <ul className="list-boards">
            {
              boards.map(item =>
                <li key={item.id} className={selectedBoardIs === item.boardId ? "list-boards__item selected": "list-boards__item"}
                    onClick={() => setSelectedBoardId(item.boardId)}>
                  <div className="text">
                    {
                      item.name
                    }
                  </div>
                  {
                    item.isCreator &&
                      <div>
                        <FontAwesomeIcon className="ico" icon={faUsersCog} />
                        <FontAwesomeIcon className="ico btn-ico" icon={faTrashAlt} onClick={() => deleteBoard(item.boardId)}/>
                      </div>
                  }
                </li>)
            }
          </ul>
      }
      <div className="add-block">
        <input className="input-textarea" type="text" onChange={ e => setName(e.target.value) }  value={name} />
        <div className="mt5 button blue-button" onClick={addNewBoard}>Добавить</div>
      </div>
    </div>
  );
}
