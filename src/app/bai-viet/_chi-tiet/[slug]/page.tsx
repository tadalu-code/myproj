import { getPostDetail, getRelatedPosts } from "@/services/api";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Home, Calendar } from "lucide-react";
import type { Metadata } from "next";

// ─── SEO: generateMetadata ────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostDetail(slug);

  if (!post) return { title: "Bài viết không tồn tại | Nông Dược Miền Nam" };

  const title = `${post.title || post.name || "Bài viết"} | Nông Dược Miền Nam`;
  const description =
    post.short_description ||
    post.description ||
    post.summary ||
    "Bài viết từ Nông Dược Miền Nam.";
  const canonicalUrl = `https://nongduocmiennam.vn/bai-viet/${slug}`;

  let ogImage = "https://nongduocmiennam.vn/logo512.png";
  try {
    const raw = post.thumbnail || post.imagesUrl || post.avatar || post.image;
    if (raw) {
      const arr = Array.isArray(raw) ? raw : JSON.parse(raw);
      if (arr[0]) ogImage = arr[0];
    }
  } catch {
    // giữ ảnh mặc định
  }

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Nông Dược Miền Nam",
      locale: "vi_VN",
      type: "article",
      images: [{ url: ogImage, width: 800, height: 450, alt: post.title || post.name }],
    },
  };
}
// ─────────────────────────────────────────────────────────────────────────────

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await getPostDetail(slug);
  // Sửa lỗi: getRelatedPosts cần topicSlug — dùng topic của bài viết hoặc fallback "tin-tuc"
  const topicSlug: string = post?.topic?.slug || post?.category_slug || "tin-tuc";
  const relatedPosts = await getRelatedPosts(topicSlug);

  if (!post) notFound();

  const title = post.title || post.name || "Đang cập nhật tiêu đề";
  const content = post.content || post.description || post.body || "";
  const date = post.created_at || post.createdAt || post.published_at || new Date();

  return (
    <div className="bg-[#f0f2f5] min-h-screen pb-20 font-sans text-black">
      {/* Container rộng 1340px giống web gốc */}
      <div className="max-w-[1340px] mx-auto px-6 py-6">

        {/* BREADCRUMB CÓ ICON HOME */}
        <nav className="flex items-center gap-2 text-[14px] text-[#00a651] mb-6 font-bold">
          <Link href="/" className="flex items-center gap-1 hover:underline">
            <Home size={16} /> Trang chủ
          </Link>
          <span className="text-gray-300">/</span>
          <Link href="/bai-viet" className="hover:underline">Bài viết</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-500 font-medium truncate max-w-[300px]">{title}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* CỘT TRÁI: NỘI DUNG CHÍNH (75%) */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">

              {/* KHỐI TIÊU ĐỀ MÀU XANH LỤC ĐẬM */}
              <div className="bg-[#007d3d] p-5">
                <h1 className="text-white text-xl md:text-2xl font-bold uppercase leading-tight">
                  {title}
                </h1>
              </div>

              <div className="p-6 md:p-10">
                <div className="flex items-center gap-2 text-gray-400 text-sm italic mb-6">
                  <Calendar size={14} />
                  <span>Ngày đăng: {new Date(date).toLocaleDateString("vi-VN")}</span>
                </div>

                <hr className="mb-8 border-gray-100" />

                <article
                  className="prose prose-slate max-w-none text-gray-800 
                  prose-p:leading-relaxed prose-p:mb-5 prose-p:text-[16px]
                  prose-strong:text-black prose-strong:font-bold
                  prose-img:rounded-xl prose-img:shadow-md prose-img:mx-auto"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: SIDEBAR (25%) */}
          <aside className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-24 overflow-hidden">
              <div className="bg-[#f8f9fa] px-4 py-3 border-b border-gray-100">
                <h3 className="text-[#007d3d] font-bold text-[16px] uppercase">Bài viết liên quan</h3>
              </div>

              <div className="p-2">
                {relatedPosts?.length > 0 ? (
                  relatedPosts.slice(0, 5).map((item: any) => (
                    <Link
                      key={item.id}
                      href={`/bai-viet/${topicSlug}/${item.slug}`}
                      className="block p-3 border-b border-gray-50 last:border-0 hover:bg-green-50 transition-colors"
                    >
                      <h4 className="text-[14px] text-gray-700 leading-snug line-clamp-2 hover:text-[#00a651] font-medium">
                        {item.title || item.name}
                      </h4>
                    </Link>
                  ))
                ) : (
                  <p className="p-6 text-center text-gray-400 italic text-sm">Đang cập nhật...</p>
                )}
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}