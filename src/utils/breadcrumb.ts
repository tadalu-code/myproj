// src/utils/breadcrumb.ts

export interface BreadcrumbData {
  currentName: string;
  parentName: string | null;
  parentLink: string | null;
}

const BREADCRUMB_MAP: Record<string, string> = {
  // === BỆNH HẠI ===
  "benh-hai-cay-trong": "Bệnh hại cây trồng",
  "benh-tren-cay-cong-nghiep": "Bệnh hại trên cây công nghiệp",
  "benh-hai-tren-cay-an-qua": "Bệnh hại trên cây ăn quả",
  "benh-hai-cay-luong-thuc": "Bệnh hại cây lương thực",
  "benh-hai-rau-mau": "Bệnh hại rau màu",
  "benh-hai-hoa-cay-canh": "Bệnh hại hoa cây cảnh",
  "benh-hai-cay-cong-nghiep": "Bệnh hại cây công nghiệp",

  // === SÂU HẠI ===
  "sau-hai-hoa-cay-canh": "Sâu hại hoa cây cảnh",
  "sau-hai-cay-trong": "Sâu hại cây trồng",
  "sau-hai-cay-luong-thuc": "Sâu hại cây lương thực",
  "sau-hai-cay-cong-nghiep": "Sâu hại cây công nghiệp",
  "sau-hai-tren-cay-an-qua": "Sâu hại cây ăn quả",
  "sau-hai-rau-mau": "Sâu hại rau màu",

  // === CỎ DẠI ===
  "co-dai-cay-trong-can": "Cỏ dại cây trồng cạn",
  "co-dai-cay-trong-duoi-nuoc": "Cỏ dại cây trồng dưới nước",
  "co-dai": "Cỏ dại",

  // === CHUỘT, SÓC ===
  "chuot-soc-hai-cay-trong": "Chuột, sóc hại cây trồng",

  // === KHÁC ===
  "chia-se-kien-thuc": "Chia sẻ kiến thức",
  "tin-tuc": "Tin tức",
  "khuyen-mai": "Khuyến mãi",
  "gioi-thieu": "Giới thiệu",
  "lien-he": "Liên hệ",
};

export const getBreadcrumbInfo = (slug: string): BreadcrumbData => {
  const currentName = BREADCRUMB_MAP[slug] || slug.replace(/-/g, ' ');

  let parentName = null;
  let parentLink = null;

  if (slug.includes("benh") && slug !== "benh-hai-cay-trong") {
    parentName = "Bệnh hại cây trồng";
    parentLink = "/bai-viet/benh-hai-cay-trong";
  } else if (slug.includes("sau") && slug !== "sau-hai-cay-trong") {
    parentName = "Sâu hại cây trồng";
    parentLink = "/bai-viet/sau-hai-cay-trong";
  } else if (slug.includes("co-dai") && slug !== "co-dai") {
    parentName = "Cỏ dại";
    parentLink = "/bai-viet/co-dai";
  } else if (slug.includes("chuot") && slug !== "chuot-soc-hai-cay-trong") {
    parentName = "Chuột, sóc hại cây trồng";
    parentLink = "/bai-viet/chuot-soc-hai-cay-trong";
  }

  return { currentName, parentName, parentLink };
};