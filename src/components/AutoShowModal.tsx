'use client';

import { useState, useEffect } from 'react';
import RegisterModal from './RegisterModal';

export default function AutoShowModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Reload là chạy lại từ đầu → luôn hiện sau 10 giây
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <RegisterModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    />
  );
}