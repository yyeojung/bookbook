import Button from 'components/common/Button';
import ReactModal from 'react-modal';

const customModalStyles: ReactModal.Styles = {
  overlay: {
    backgroundColor: ' rgba(0, 0, 0, 0.4)',
    width: '100%',
    height: '100vh',
    zIndex: '10',
    position: 'fixed',
    top: '0',
    left: '0'
  },
  content: {
    minWidth: '34rem',
    height: 'fit-content',
    minHeight: '18rem',
    zIndex: '150',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '1.6rem',
    boxShadow: '.0rem .4rem 1.6rem 0 rgba(0, 0, 0, 0.16)',
    backgroundColor: 'white',
    justifyContent: 'center',
    overflow: 'auto',
    padding: '2.8rem'
  }
};

interface ModalProps {
  isOpen: boolean;
  type?: string;
  message?: string;
  onClose: () => void;
  onClick?: () => void;
  title?: string;
  children?: React.ReactNode;
}

export default function ModalLayout({
  isOpen,
  type = 'modal',
  message,
  onClose,
  onClick,
  title,
  children
}: ModalProps) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customModalStyles}
      ariaHideApp={false}
    >
      {/* type alert */}
      {type === 'alert' && (
        <div className='default alert'>
          <p>{message}</p>
          <div className='btn_wrap'>
            <Button width={100} onClick={onClose}>
              확인
            </Button>
          </div>
        </div>
      )}

      {/* type confirm */}
      {type === 'confirm' && (
        <div className='default confirm'>
          <p>{message}</p>
          <div className='btn_wrap'>
            <Button width={100} onClick={onClick}>
              확인
            </Button>
            <Button width={100} className='gray' onClick={onClose}>
              취소
            </Button>
          </div>
        </div>
      )}

      {/* type modal */}
      {type === 'modal' && (
        <>
          <h2>{title}</h2>
          <div>{children}</div>
        </>
      )}
    </ReactModal>
  );
}
