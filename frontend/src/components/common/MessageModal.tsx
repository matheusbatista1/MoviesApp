interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

export const MessageModal = ({ isOpen, onClose, title, message }: MessageModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-form-background rounded-lg p-6 z-10 w-full max-w-sm">
        <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
        <p className="text-text-footer mb-6">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-button-primary-default text-white rounded hover:bg-button-primary-hover transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};