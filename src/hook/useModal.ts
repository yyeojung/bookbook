import { useState } from 'react';

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<string | null>(null);

  const openModal = (name: string) => setIsModalOpen(name);
  const closeModal = () => setIsModalOpen(null);

  return {
    isModalOpen,
    openModal,
    closeModal
  };
};
