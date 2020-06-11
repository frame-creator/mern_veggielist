import React, {useState, useContext} from 'react';
import './UserPlaceItem.css';
import Card from '../../elements/components/uielements/Card';
import Button from '../../elements/components/formelements/Button';
import Modal from '../../elements/components/uielements/Modal';
import Map from '../../elements/components/uielements/Map';
import './UserPlaceItem.css';
import LoadingSpinner from '../../elements/components/uielements/LoadingSpinner';
import {useHttpClient} from '../../elements/hooks/http-hook';
import { AuthContext } from '../../elements/context/auth-context';

const UserPlaceItem = props => {
const {isLoading, error, sendRequest, clearError} = useHttpClient();
const auth = useContext( AuthContext );
const [showMap, setShowMap] = useState(false);
const [showConfirmModal, setShowConfirmModal] = useState(false);

const openMapHandler = () => setShowMap(true);
const closeMapHandler = () => setShowMap(false);

const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
}

const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
}

const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
        await sendRequest(
            `http://localhost:5000/api/places/${props.id}`,
            'DELETE',
            null,
            {
                Authorization: 'Bearer' + auth.token
            }
        );
        props.onDelete(props.id);
    } catch (err) {}
};

    return (

        <React.Fragment>
            <Modal
            show={showMap}
            onCancel={closeMapHandler}
            header={props.address}
            contentClass="user-place-item__modal-content"
            footerClass="user-place-item__modal-actions"
            footer={<Button onClick={closeMapHandler}>닫기</Button>}
            >
            <div className="user-map-container">
                <Map center={props.coordinates} zoom={16}/>
            </div>
            <div className="user-modal-description">
            <p>{props.description}</p>
            </div>

            </Modal>

            <Modal
            show={showConfirmModal}
            onCancel={cancelDeleteHandler}
            header="정말로 삭제하시겠습니까?"
            footerClass="user-place-item__modal-actions"
            footer={
                <React.Fragment>
                    <Button inverse onClick={cancelDeleteHandler}>
                        취소
                    </Button>
                    <Button danger onClick={confirmDeleteHandler}>
                        삭제
                    </Button>
                </React.Fragment>

            }
            >
                <p>
                    장소를 삭제하시는 경우 복원이 어렵습니다.
                </p>
            </Modal>
    
    
    <li className="user-place-item">
        <Card className="user-place-item__content">
            {isLoading && <LoadingSpinner asOverlay/>}
        <div className="user-place-item__image">
            <img src={props.image} alt={props.title}/>
      </div>
        <div className="user-place-item__info">
        <div className="user-place-item__info title">
            <p>{props.title}</p>
            </div>
            <div className="user-place-item__info address">
            <p>{props.address}</p>
            </div>
            <div className="user-place-item__info description">
            <p>{props.description}</p>
            </div>
        </div>
        <div className="user-place-item__actions">
        <div className="user-place-item__button">
            <Button onClick={openMapHandler}>지도 확인</Button></div>
            <div className="user-place-item__button">
            <Button inverse to ={`/places/${props.id}`}>수정</Button></div>
            <div className="user-place-item__button">
                {auth.userId === props.creatorId && (
            <Button danger onClick={showDeleteWarningHandler}>삭제</Button>
                )}
            </div>
           </div>
       
        </Card>
    </li>
    </React.Fragment>
    );
};
 
export default UserPlaceItem;