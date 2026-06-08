export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full bg-white">
      {/* Vòng xoay Spinner màu xanh Nông Dược Miền Nam */}
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#00a651]"></div>
      
      <p className="mt-4 text-[#00a651] font-bold animate-pulse uppercase tracking-widest text-sm">
        Đang tải nội dung bài viết...
      </p>
    </div>
  );
} 