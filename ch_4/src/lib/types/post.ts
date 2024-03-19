interface UserAddress {
  user_id: string;
  address: string;
  detail_address: string;
  city: string;
  state: string;
  postal_code: string;
}

interface UserAddressResponse extends UserAddress {
  id: number;
}

type status = "success" | "failure";

interface responseObject {
  message: string;
  status: status;
}
