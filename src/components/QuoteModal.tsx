import React from 'react';
import { Modal } from '@/components/ui/Modal';
import QuoteForm from '@/components/QuoteForm';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Solicitar Cotação de Voo"
      size="xl"
      className="max-h-[90vh] overflow-y-auto"
    >
      <QuoteForm />
    </Modal>
  );
};

export default QuoteModal; 