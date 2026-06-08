'use client';

import { useEffect } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 animate-fade-in" onClick={onClose}></div>

      {/* Modal */}
      <div className="w-full max-w-[420px] bg-white rounded-[12px] shadow-2xl relative z-10 animate-modal-bounce">
        {/* Nút đóng — nhô ra ngoài */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-20 w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-500 hover:text-gray-800 transition-all hover:scale-110 shadow-md border border-gray-100"
        >
          <span className="text-[20px] leading-none mb-[2px]">×</span>
        </button>

        <div className="px-8 py-10 text-center">
          {/* Tiêu đề */}
          <h2
            className="text-[#007d3d] font-black text-[28px] md:text-[32px] uppercase mb-8"
            style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.02em' }}
          >
            Đăng nhập
          </h2>

          {/* Nút Google */}
          <button
            onClick={() => {
              // TODO: Tích hợp Google OAuth
              alert('Chức năng đăng nhập Google sẽ được tích hợp sau!');
            }}
            className="w-full max-w-[300px] mx-auto flex items-center justify-center gap-3 px-6 py-3 rounded-full border border-gray-300 bg-white hover:bg-gray-50 transition-all hover:shadow-md text-[15px] font-medium text-[#333]"
          >
            Đăng nhập với Google
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
          </button>

          {/* Đăng ký */}
          <p className="mt-6 text-[14px] text-[#666]">
            Bạn chưa có tài khoản?{' '}
            <button
              onClick={() => {
                // TODO: Mở modal đăng ký hoặc chuyển trang
                alert('Chức năng đăng ký sẽ được tích hợp sau!');
              }}
              className="font-bold text-[#333] hover:text-[#007d3d] transition-colors"
            >
              Đăng ký
            </button>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalBounce {
          0% { opacity: 0; transform: scale(0.8) translateY(40px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
        .animate-modal-bounce { animation: modalBounce 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
      `}</style>
    </div>
  );
}   