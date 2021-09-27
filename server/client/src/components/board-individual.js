import { useSelector } from 'react-redux';
import ListsAll from './lists-all.js';
import { editIconUrl, deleteIconUrl } from '../constants/constants.js';
import { Modal, Button } from "react-bootstrap";
import { useState } from 'react';



const BoardIndividual = () => {
  const [show, setShow] = useState(false);
  const handleModalShow = () => setShow(true);
  const handleModalClose = () => setShow(false);
  const handleModalEdit = () => {
    //  Still needs implementation
    setShow(false);
  }
  const newBoardInputChangeHandler = (e) => {
    //  Philip working on this.  Still needs functionality
    // setNewBoardName(e.target.value)
  }
  const board = useSelector(state => state.board)


  const renderBoardDetail = (board) => {
    return (
    <div className="row">
      <div className="col-md-4"></div>
      <div className="col-md-4">
        <h2 className="board-ind-title text-center">
          <strong>{board.name}</strong>
        </h2>
      </div>  
      <div className="col-md-4 d-flex align-items-center justify-contents-start board-ind-title-icons-col">
        <img src={editIconUrl} alt="edit" className="edit-icon" onClick={handleModalShow}/>
        <img src={deleteIconUrl} alt="delete" className="delete-icon" />
      </div> 
    </div> 
    )
  }

  const renderEditBoardModal = () => {
    return (
      <div>
        <Modal show={show} onHide={handleModalClose}>
          <Modal.Header closeButton><Modal.Title>Edit the name of this board:</Modal.Title></Modal.Header>
          <Modal.Body>
            <input type="text" className="form-control" value={board.name} placeholder="New board title" onChange={newBoardInputChangeHandler} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary text-center" onClick={handleModalEdit}>
              Edit board name
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }

  return (
    <div>
      <div className="row">
        <div className="col align-items-center">
          {renderBoardDetail(board)}   
          {renderEditBoardModal()}      
          <ListsAll />
        </div>

      </div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

    </div>
  );
}

export default BoardIndividual;