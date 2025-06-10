import React from "react";
import { Modal } from "react-bootstrap";

const ProductDetailModal = ({ show, onHide, item }: any) => {
  if (!item) return null;

  return (
    <Modal show={show} onHide={onHide} centered size="xl">
      {/* <Modal.Header closeButton>
        <Modal.Title>{item.name}</Modal.Title>
      </Modal.Header> */}
      <Modal.Body>
        <div className="row">
          <div className="col-12 col-md-6">
          <img src={"/images/popup-img.png"} alt={"popup-img"} className="img-fluid left-modal-img" />
          </div>
          <div className="col-12 col-md-6">
            <div className="product-detail-content">
            <span>{item.category}</span>
            <h4>{item.name}</h4>
            <p>{item.description}</p>
            </div>
          </div>

        </div>
      
      </Modal.Body>
    </Modal>
  );
};

export default ProductDetailModal;
