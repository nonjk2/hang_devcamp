"use client";
import { ChangeEvent, MouseEventHandler, useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Address, useDaumPostcodePopup } from "react-daum-postcode";

import DynamicInput from "../ui/dynamicInput";
import { handleComplete } from "@/lib/utils";
import { useToast } from "../ui/use-toast";
import ClipLoader from "../ui/spinner";
import { CombineFetch } from "@/lib/action";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

interface addressInputValue {
  address: string;
  detailAddress: string;
  fullAdressData: Address;
}

const defaultInputValue = {
  fullAdressData: {} as Address,
  address: "",
  detailAddress: "",
};
const scriptUrl =
  "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

const CheckOutUserAddressComponent = ({
  user,
  Addresses = [] as UserAddressResponse[],
}: {
  user: authUser;
  Addresses?: UserAddressResponse[];
}) => {
  const [userAdress, setUserAddress] = useState(user.address);
  const { toast } = useToast();
  const [isLoaing, setLoading] = useState(false);
  const [addressInputValue, setAddressInputValue] =
    useState<addressInputValue>(defaultInputValue);
  // const selectedAddress = Addresses[0].id ?? null;
  const [addressSelect, setAddressSelect] = useState<string | null>();
  const onChangeHandler = (e: string) => {
    // setPayState(e.target)
    setAddressSelect(e);
  };

  const open = useDaumPostcodePopup(scriptUrl);

  const handleClick = () => {
    open({
      onComplete: (data: Address) =>
        handleComplete(
          (fullAdress: string, fulldata: Address) =>
            setAddressInputValue((prev) => ({
              ...prev,
              ["fullAdressData"]: fulldata,
              ["address"]: fullAdress,
            })),
          data
        ),
    });
  };

  const onChangeInputAddressValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setAddressInputValue((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const onClickAddress = async () => {
    if (!(addressInputValue.address && addressInputValue.detailAddress)) {
      return toast({
        description: "주소를 입력해주세요",
        duration: 2000,
        variant: "destructive",
      });
    }
    const {
      address,
      zonecode: postal_code,
      sido: state,
      sigungu: city,
    } = addressInputValue.fullAdressData;
    setLoading(true);

    try {
      const res = await CombineFetch<{ message: string }, UserAddress>({
        path: "/api/address",
        method: "POST",
        body: {
          address,
          city,
          postal_code,
          state,
          user_id: user.id,
          detail_address: addressInputValue.detailAddress,
        },
      });

      if (res.status === "success") {
        setAddressInputValue(defaultInputValue);
        toast({ description: res.data.message, duration: 2000 });
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="rounded-none">
      <CardHeader>
        <CardTitle className="text-lg">배송 정보</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-2">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">배송지선택</TabsTrigger>
            <TabsTrigger value="password">신규입력</TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            {Addresses ? (
              <RadioGroup
                onValueChange={onChangeHandler}
                value={String(addressSelect) ?? ""}
                className="flex mt-1 w-full flex-wrap gap-0"
              >
                {Addresses.map((e, i) => (
                  <div
                    className="flex w-full gap-2 justify-center p-2 py-6 border-b"
                    key={e.id}
                  >
                    <RadioGroupItem value={String(e.id)} id={String(e.id)} />
                    <div className="flex flex-col grow">
                      <div className="flex justify-between">
                        <Label htmlFor={String(e.id)}>홍길동</Label>
                        {/* 수정삭제 */}
                        <div className="flex text-sm text-primary">
                          <span className="cursor-pointer after:border after:mx-1">
                            수정
                          </span>
                          <span className="cursor-pointer">삭제</span>
                        </div>
                      </div>

                      <div className="flex w-full flex-col text-sm">
                        <div className="">{e.address}</div>
                        <div>{e.detail_address}</div>
                        <div>{`(${e.postal_code})`}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            ) : (
              <></>
            )}
          </TabsContent>

          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>배송지 주소입력</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col space-y-2">
                <DynamicInput
                  value={addressInputValue.address}
                  onChange={onChangeInputAddressValue}
                  id={"address"}
                  label="주소입력"
                  placeholder="주소를입력해주세요"
                />
                <DynamicInput
                  value={addressInputValue.detailAddress}
                  // defaultValue={addressInputValue.detailAddress}
                  onChange={onChangeInputAddressValue}
                  id={"detailAddress"}
                  label="상세주소입력"
                  placeholder="상세주소입력"
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button onClick={handleClick} disabled={isLoaing}>
                  주소 찾기
                </Button>
                <Button
                  onClick={onClickAddress}
                  disabled={isLoaing}
                  className="w-20"
                >
                  {isLoaing ? (
                    <ClipLoader color="#36d7b7" size={20} />
                  ) : (
                    "저장하기"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        {/* <div className="flex justify-between w-full">
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
        <div></div> */}
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
