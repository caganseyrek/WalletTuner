interface ModalProps {
  type: string;
}

const Modal = ({ type }: ModalProps) => {
  return (
    <div id="modal-bg">
      <div id="modal-container">
        <div id="modal-header">{type}</div>
        <div id="modal-body"></div>
      </div>
    </div>
  );
};

export default Modal;
