import React, {useState} from 'react';
import './PlaceItem.css';
import Card from '../../elements/components/uielements/Card';
import Button from '../../elements/components/formelements/Button';
import Modal from '../../elements/components/uielements/Modal';
import Map from '../../elements/components/uielements/Map';

const PlaceItem = props => {

    const [showMap, setShowMap] = useState(false);
    const openMapHandler = () => setShowMap(true);
    const closeMapHandler = () => setShowMap(false);

   return(
       <React.Fragment>
   <Modal
    show={showMap}
    onCancel={closeMapHandler}
    header={props.address}
    contentClass="place-item__moal-content"
    footerClass="place-item__modal-actons"
    footer={<Button onClick={closeMapHandler}>닫기</Button>}
    >
        <div className="map-container">
            <Map center={props.coordinates} zoom={16}/>
        </div>
        <div className="modal-description">
            <p>{props.description}</p>
        </div>

    </Modal>



   <li className="place-item">
        <Card className="place-item__content">
        <div className="place-item__image">
            <img src={props.image} alt={props.title}/>
      </div>
        <div className="place-item__info">
        <div className="place-item__info title">
            <p>{props.title}</p>
            </div>
            <div className="place-item__info address">
            <p>{props.address}</p>
            </div>
            
        </div>
        <div className="place-item__action">
 
        <div className="place-item__button__map">
            <Button onClick={openMapHandler}>지도 확인</Button>
            </div>
            <div className="place-item__button__update">
            <Button inverse to={`/places/${props.id}`}>수정</Button>
            </div>
        
           </div>
       
        </Card>
    </li>
    </React.Fragment>
   );
};
 
export default PlaceItem;