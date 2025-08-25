import type { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  position?: 'center' | 'right';
}

const Modal = ({ isOpen, onClose, children, position = 'center' }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 overflow-y-auto'>
      <div
        className='fixed inset-0 bg-gray-800 bg-opacity-40 backdrop-filter backdrop-blur-md'
        onClick={onClose}
      />
      {position === 'center' ? (
        <div className='relative min-h-screen flex items-center justify-center p-4'>
          <div className='relative bg-form-background rounded-lg shadow-xl p-6 max-w-lg max-h-[90vh] overflow-y-auto'>
            {children}
          </div>
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default Modal;
