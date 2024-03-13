import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = {
    confmKey: "U01TX0FVVEgyMDI0MDMxMjEwNDg0NjExNDU4NTE=",
    returnUrl: "http://localhost:3000/checkout",
  };

  const res = await fetch(
    `https://business.juso.go.kr/addrlink/addrLinkUrl.do?confmKey=${`U01TX0FVVEgyMDI0MDMxMjEwNDg0NjExNDU4NTE=`}&returnUrl=${`http://localhost:3000/checkout`}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  );

  // const result = await res.json();
  if (res.ok) {
    // console.log(result);
    console.log(res);
  }

  return NextResponse.json("");
};
