'use client';

import { useState } from 'react';
import LoginModal from './LoginModal';

export default function LoginButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-[#ff0000] font-bold underline underline-offset-4 decoration-2"
      >
        Đăng nhập
      </button>
      <LoginModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}