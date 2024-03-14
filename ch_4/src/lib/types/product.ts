interface Product {
  id: string;
  product_info: ProductInfo;
}

interface ProductInfo {
  name: string;
  price: string;
  productId: string;
  image: string;
  size: string;
}

interface ProductWithCount extends Product {
  count: number;
}
