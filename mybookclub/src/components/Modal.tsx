import React from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  if (open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export const ModalContent: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="modal-body">{children}</div>
);

export const ModalAction: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="modal-footer">{children}</div>
);