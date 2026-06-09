export default function Loading() {
  return (
    <div className="bg-[#f4f4f4] min-h-screen">
      <div className="max-w-[1340px] mx-auto px-4 py-6">

        {/* Skeleton thanh filter danh mục */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-9 w-32 rounded-full bg-gray-200 animate-pulse shrink-0" />
          ))}
        </div>

        {/* Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm">
              {/* Ảnh */}
              <div className="aspect-square bg-gray-200 animate-pulse" />
              {/* Tên */}
              <div className="p-3 space-y-2">
                <div className="h-3 bg-gray-200 animate-pulse rounded w-full" />
                <div className="h-3 bg-gray-200 animate-pulse rounded w-3/4" />
                {/* Nút */}
                <div className="h-8 bg-gray-200 animate-pulse rounded mt-2" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}