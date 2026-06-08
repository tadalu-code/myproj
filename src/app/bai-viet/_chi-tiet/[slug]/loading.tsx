export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00a651]"></div>
      <p className="mt-4 text-[#00a651] font-medium animate-pulse">Đang tải bài viết...</p>
    </div>
  );
}