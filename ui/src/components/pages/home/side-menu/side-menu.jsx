import React from "react";

import { useDispatch, useSelector } from 'react-redux';
import boardService from '../../../../service/dashboard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsersCog, faTrashAlt, faDoorOpen } from '@fortawesome/free-solid-svg-icons';

import './side-menu.scss';
import { deleteBoardAction, setBoardAction } from '../../../../store/actions/board';
import { InputContainer } from '../board/Input/InputContainer';
import { BoardModal } from '../../../modal/board-modal/BoardModal';

export default function SideMenu(){
  const user = useSelector(state => state.user);
  const [boards, setBoards] = React.useState(null);
  const boardId = useSelector((state) => state.boardId);
  const dispatch = useDispatch();

const [open, setOpen] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

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
    dispatch(deleteBoardAction());
    await boardService.deleteBoard(id);
    LoadMyDashBoard();
  }

  async function goOutOtherBoard(id) {
      if(user !== null && user.user !== null){
          await boardService.deleteUserForId(user.user.id, id);
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
                <li key={item.id} className={boardId === item.boardId ? "list-boards__item selected": "list-boards__item"}
                    onClick={() => dispatch(setBoardAction(item.boardId))}>
                  <div className="text">
                    {
                      item.name
                    }
                  </div>
                  {
                    item.isCreator ?
                      <div>
                        <FontAwesomeIcon className="ico btn-ico" icon={faUsersCog} onClick={handleOpen}/>
                        <FontAwesomeIcon className="ico btn-ico" icon={faTrashAlt} onClick={() => deleteBoard(item.boardId)}/>
                      </div>
                        :
                        <div>
                           <FontAwesomeIcon className="ico btn-ico" icon={faDoorOpen} onClick={() => goOutOtherBoard(item.boardId)}/>
                        </div>
                  }
                    <BoardModal boardId={item.boardId} open={open} handleClose={handleClose} load={LoadMyDashBoard}/>
                </li>)
            }
          </ul>
      }
      <InputContainer type="board" load={LoadMyDashBoard}/>

    </div>
  );
}
