"use client";
import { MouseEventHandler, useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

declare global {
  interface Window {
    jusoCallBack: (...args: any[]) => void;
  }
}

const CheckOutUserAddressComponent = ({ user }: { user: User }) => {
  const [userAdress, setUserAddress] = useState(user.address);
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const roadAddrPart1 = queryParams.get("roadAddrPart1") ?? "";
    const addrDetail = queryParams.get("addrDetail") ?? "";
    const zipNo = queryParams.get("zipNo") ?? "";

    if (roadAddrPart1 || addrDetail || zipNo) {
      setUserAddress({
        roadAddrPart1,
        addrDetail,
        zipNo,
      });
    }
  }, []);
  const handleAddressData = (
    roadFullAddr: any,
    roadAddrPart1: any,
    addrDetail: any,
    ...otherParams: any
  ) => {
    setUserAddress(roadFullAddr);
    console.log(roadAddrPart1, addrDetail, ...otherParams);
  };
  const openJusoPopup = () => {
    const confmKey = "U01TX0FVVEgyMDI0MDMxMjEwNDg0NjExNDU4NTE=";
    const returnUrl = encodeURIComponent(window.location.href);
    const jusoPopupUrl = `https://business.juso.go.kr/addrlink/addrLinkUrl.do?confmKey=${confmKey}&returnUrl=${returnUrl}&resultType=4`;

    window.open(jusoPopupUrl);
  };

  return (
    <Card className="rounded-none">
      <CardHeader>
        <CardTitle className="text-lg">배송 정보</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-2 mt-3">
        <div className="flex justify-between w-full">
          <div className="flex flex-col">
            <div className="text-sm py-1">{user.nickname}</div>
            {user.phone && (
              <div className="text-gray-400 text-xs">{user.phone}</div>
            )}
          </div>
          <div className="">
            <Button onClick={openJusoPopup}>수정</Button>
          </div>
        </div>
        <div></div>
      </CardContent>
      <CardFooter>
        <div className="flex flex-col w-full">
          <span>배송 메모</span>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="배송메모를 선택해주세요" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">집문앞에 놔주세요.</SelectItem>
              <SelectItem value="dark">
                문앞에두고 경비실에 연락해주세요.
              </SelectItem>
              <SelectItem value="system">도착시 연락주세요.</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardFooter>
    </Card>
  );
};
export default CheckOutUserAddressComponent;
