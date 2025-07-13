import ReactModal from 'react-modal';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

ReactModal.setAppElement('#root');

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const customStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      zIndex: 1000
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background: '#fff',
      padding: '20px',
      borderRadius: '4px',
      minWidth: '400px',
      maxWidth: '600px',
      color: 'black'
    },
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Test Case Details"
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
