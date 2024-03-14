import { faker } from "@faker-js/faker";
const mockData: Product[] = [
  {
    id: "1",
    product_info: {
      name: "Classic Tee",
      productId: "as",
      price: "6000",
      image: faker.image.urlLoremFlickr({ category: "fashion" }),
      size: "M",
    },
  },
  {
    id: "2",
    product_info: {
      name: "Classic Tee",
      productId: "as",
      price: "6000",
      image: faker.image.urlLoremFlickr({ category: "fashion" }),
      size: "L",
    },
  },
  {
    id: "3",
    product_info: {
      name: "Leather Jacket",
      price: "150000",
      productId: "ass",
      image: faker.image.urlLoremFlickr({ category: "fashion" }),
      size: "XL",
    },
  },
];

const mockCoupons: Coupon[] = [
  {
    id: "1",
    couponName: "10,000원 할인 쿠폰",
    couponDescription: "전 상품 대상 10,000원 직접 할인",
    couponNumber: "FA10000",
    use: false,
    couponValue: 10000,
    couponType: "fixedAmount",
  },
  {
    id: "2",
    couponName: "5,000원 할인 쿠폰",
    couponDescription: "전 상품 대상 5,000원 직접 할인",
    couponNumber: "FA5000",
    use: false,
    couponValue: 5000,
    couponType: "fixedAmount",
  },
  {
    id: "3",
    couponName: "10% 할인 쿠폰",
    couponDescription: "전 상품 대상 10% 할인, 최대 20,000원 할인",
    couponNumber: "PD10",
    use: false,
    couponValue: 10, // 10% 할인
    couponType: "percentDiscount",
  },
  {
    id: "4",
    couponName: "20% 할인 쿠폰",
    couponDescription: "전 상품 대상 20% 할인, 최대 30,000원 할인",
    couponNumber: "PD20",
    use: false,
    couponValue: 20, // 20% 할인
    couponType: "percentDiscount",
  },
];

export { mockData, mockCoupons };
