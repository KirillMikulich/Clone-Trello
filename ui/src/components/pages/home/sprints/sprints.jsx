import React from 'react';
import sprintService from '../../../../service/sprints';
import './sprints.scss';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ModalWindow } from '../../../modal';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export function Sprints({columnId}) {
    const [sprints, setSprints] = React.useState([]);
    const [title, setTitle] = React.useState('');

    const [isShowModal, setIsShowModal] = React.useState(false);
    const [participant, setParticipant] = React.useState([]);

    React.useEffect(() => {
        loadSprints();
    }, [columnId]);

    function showModal(id) {
        setIsShowModal(true);
        loadParticipant(id);
    }

    function closeModal() {
        setIsShowModal(false);
        setParticipant([]);
    }

    async function loadParticipant(id) {

    }

    async function loadSprints(){
        const sprint  = await sprintService.allSprints(columnId);
        if(sprint !== null && sprint.length > 0){
            setSprints(sprint);
        }
    }

    async function addSprint(){
        await sprintService.addSprint(columnId, title);
        setTitle('');
        loadSprints();
    }

    async function deleteSprint(id){
        await sprintService.deleteSprint(id);
        loadSprints();
    }

    function handleOnDragEnd(result) {
        console.log(result);
        if (!result.destination) return;

        const items = Array.from(sprints);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setSprints(items);
    }

    return (
        <div className="sprints">
            <div className="controls">
                <input className="input-textarea" type="text" onChange={ e => setTitle(e.target.value) }  value={title}/>
                <div className="ml10 button blue-button" onClick={addSprint}>+</div>
            </div>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="sprints" direction="vertical">
                    {(provided) => (
                        <ul className="sprints-container" {...provided.droppableProps} ref={provided.innerRef}>
                            {sprints.map((item, index) => {
                                return (
                                    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                        {(provided) => (
                                            <li className="sprint-item" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <div className='title'>{item.name}</div>
                                                <div className="controls">
                                                    <FontAwesomeIcon className="ico btn-ico mr5" icon={faEdit} onClick={() => showModal(item.id)}/>
                                                    <FontAwesomeIcon className="ico btn-ico" icon={faTrashAlt} onClick={() => deleteSprint(item.id)}/>
                                                </div>
                                                <ModalWindow title={'Редактировать'} onClose={closeModal} show={isShowModal}>
                                                    <div className="modal-container">

                                                        <div className="row">
                                                            <div className="label">Название спринта</div>
                                                            <input type="text"/>
                                                        </div>

                                                        <div className='row mt10'>
                                                            <div className='label'>Пользователли</div>
                                                            <ul className="users-list">
                                                                <li className='item'>User1
                                                                    <FontAwesomeIcon className="ico btn-ico"
                                                                                     icon={faTrashAlt}
                                                                                     onClick={() => deleteSprint(item.id)}/></li>
                                                                <li className='item'>User2
                                                                    <FontAwesomeIcon className="ico btn-ico"
                                                                                     icon={faTrashAlt}
                                                                                     onClick={() => deleteSprint(item.id)}/></li>
                                                                <li className='item'>User3
                                                                    <FontAwesomeIcon className="ico btn-ico"
                                                                                     icon={faTrashAlt}
                                                                                     onClick={() => deleteSprint(item.id)}/></li>
                                                            </ul>
                                                        </div>

                                                        <div className='row mt10'>
                                                            <div className='label'>Добавить пользователя</div>

                                                        </div>

                                                        <div className='row'>
                                                            <div className='label'>Добавить комментарий</div>
                                                        </div>

                                                        <div className='row'>
                                                            <div className='label'>Комментарии</div>

                                                        </div>
                                                    </div>
                                                </ModalWindow>
                                            </li>
                                        )}
                                    </Draggable>
                                );
                            })}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
            <ul >
                {
                    sprints.length > 0 &&
                        sprints.map( item => <li draggable={true}
                                                 key={item.id} >

                        </li>)
                }
            </ul>

        </div>
    );
}
