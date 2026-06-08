// Định nghĩa cấu trúc Menu
export interface NavItem {
  id: string;
  title: string;
  url: string;
  // Thêm dòng này: Dấu ? nghĩa là có thể có hoặc không có menu con
  children?: NavItem[]; 
}

// Định nghĩa cấu trúc Sản phẩm
export interface Product {
  id: string;
  name: string;
  thumbnail: string;
  price?: number;
  slug: string;
}