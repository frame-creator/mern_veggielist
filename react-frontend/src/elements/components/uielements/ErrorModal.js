import React from 'react';
import Modal from './Modal';
import Button from '../formelements/Button';

const ErrorModal = props => {
    return (
        <Modal
        onCancel = {props.onClear}
        header="다시 시도해주세요."
        show={!!props.error}
        footer={<Button onClick ={props.onClear}>확인</Button>}
    >
        <p>{props.error}</p>
    </Modal>
        );
};

export default ErrorModal;