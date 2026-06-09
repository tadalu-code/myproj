export default function Loading() {
  return (
    <div className="bg-[#f4f4f4] min-h-screen">
      <div className="max-w-[1340px] mx-auto px-4 py-4">

        {/* Skeleton breadcrumb */}
        <div className="flex items-center gap-2 mb-4">
          <div className="h-4 w-20 bg-gray-200 animate-pulse rounded" />
          <div className="h-4 w-2 bg-gray-200 animate-pulse rounded" />
          <div className="h-4 w-32 bg-gray-200 animate-pulse rounded" />
        </div>

        {/* Layout 9 + 3 cột */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

          {/* Cột chính: lưới 2 bài viết */}
          <div className="md:col-span-9">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded shadow-sm overflow-hidden">
                  {/* Ảnh 16/9 */}
                  <div className="aspect-video bg-gray-200 animate-pulse" />
                  {/* Nội dung */}
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-full" />
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-5/6" />
                    <div className="h-3 bg-gray-200 animate-pulse rounded w-full mt-2" />
                    <div className="h-3 bg-gray-200 animate-pulse rounded w-4/5" />
                    <div className="h-3 bg-gray-200 animate-pulse rounded w-3/5" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-3">
            <div className="bg-white rounded shadow-sm overflow-hidden">
              <div className="h-10 bg-gray-100 animate-pulse border-b border-gray-200" />
              <div className="p-2 space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="aspect-video bg-gray-200 animate-pulse rounded w-full" />
                    <div className="h-3 bg-gray-200 animate-pulse rounded w-full" />
                    <div className="h-3 bg-gray-200 animate-pulse rounded w-3/4" />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}