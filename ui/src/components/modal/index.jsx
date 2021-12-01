import * as React from 'react';
import './index.scss';

export function ModalWindow(props) {
    function onClose(e) {
        props.onClose && props.onClose(e);
    }

    if (!props.show) {
        return null;
    }

    return (
        <div className="modal" id="modal">
            <h2>{props.title}</h2>
            <div className="content">{props.children}</div>
            <div className="actions">
                <button className="button blue-button" onClick={onClose}>
                    Закрыть
                </button>
            </div>
        </div>
    );
}
