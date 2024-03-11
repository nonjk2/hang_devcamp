# 구상하기 Day6

> 간단한 이커머스 웹사이트 만들기 (결제 + 쿠폰 포함)

## 결제 프로세스

1. **결제 페이지**: (day6)

   - 사용자가 상품 결제를 진행할 수 있는 페이지.
   - 결제 정보 입력란, 주문 상품 확인란, 최종 결제 버튼 등을 포함.

2. **홈페이지**:

   - 상품들이 나열된 구조.
   - 각 상품 이미지 아래에는 "장바구니 추가" 버튼이 위치.

3. **헤더**:

   - 웹사이트의 모든 페이지에 공통으로 나타나며, 장바구니 아이콘 포함.
   - 장바구니 아이콘 옆에는 "장바구니 결제하기" 버튼이 위치.

4. **장바구니(헤더)**:

   - 사용자가 선택한 상품 목록을 보여줌.
   - "결제하기" 버튼을 포함하여 결제 페이지로 이동할 수 있도록 함.

### 결제하기

- 해당 최상위 페이지에서 provider를 감쌀예정 (context로 결제 관리)
<!-- - 해당 상품id 정보 가져오기 -->

#### 주문 상품 정보

- 장바구니에 존재하는 주문 상품정보 가져오기(checkout 페이지에서 context로 넘기기)

#### 주문자 정보

- 로그인 비로그인 분기처리
  - 로그인 : 세션내에서 주문정보 확인 주소는 입력받기
  - 비로그인 : Input창으로 입력받게 하기
- 배송 메모 :드롭다운

#### 쿠폰

- 비회원의 경우 쿠폰 사용불가
- 회원의경우 쿠폰 확인후 적용시키기
- 적용시킨것 토대로 context state업데이트
- 쿠폰 타입 설정하기(일단 임시)

```ts
interface defaultCoupon {
  id: string;
  couponName: string;
  couponDescription: string;
  couponNumber: string;
  use: boolean;
  couponValue: number;
}

interface FixedAmountCoupon extends defaultCoupon {
  couponType: "fixedAmount";
}

interface PercentDiscountCoupon extends defaultCoupon {
  couponType: "percentDiscount";
}

type Coupon = FixedAmountCoupon | PercentDiscountCoupon;
```

#### 최종결제

- context state안에 값들 계산 (결제금액 - 쿠폰할인(couponType따라 계산) - point + 배송비)

#### 결제방법

- 무통장입금 및 토스페이먼츠 라이브러리 사용예정

#### 결제하기

- 결제 로직 통과시 true리턴 하는 함수설정후 결제하기분기처리
