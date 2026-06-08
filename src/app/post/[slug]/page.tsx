// Route này hiện chưa được sử dụng.
// Redirect về trang bài viết tương ứng.
import { redirect } from "next/navigation";

export default async function PostSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // Chuyển hướng về cấu trúc URL chuẩn
  redirect(`/bai-viet/chia-se-kien-thuc/${slug}`);
}
