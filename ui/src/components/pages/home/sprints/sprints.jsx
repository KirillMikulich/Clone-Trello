import React from 'react';
import sprintService from '../../../../service/sprints';
import './sprints.scss';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Sprints({columnId}) {
    const [sprints, setSprints] = React.useState([]);
    const [title, setTitle] = React.useState('');

    React.useEffect(() => {
        loadSprints();
    }, [columnId]);

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

    return (
        <div className="sprints">
            <div className="controls">
                <input className="input-textarea" type="text" onChange={ e => setTitle(e.target.value) }  value={title}/>
                <div className="ml10 button blue-button" onClick={addSprint}>+</div>
            </div>
            <div className="sprints-container">
                {
                    sprints.length > 0 &&
                        sprints.map( item => <div key={item.id} className="sprint-item">
                            <div className='title'>{item.name}</div>
                            <FontAwesomeIcon className="ico btn-ico" icon={faTrashAlt} onClick={() => deleteSprint(item.id)}/>
                        </div>)
                }
            </div>
        </div>
    );
};
