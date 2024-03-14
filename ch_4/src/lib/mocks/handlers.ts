import { http, HttpResponse, StrictResponse } from "msw";
import { faker } from "@faker-js/faker";

const User: authUser[] = [
  {
    id: "87e9fba7-3733-400b-bb88-866e0fe24541",
    nickname: "eundol",
    image: faker.image.avatar(),
    email: "test@test.com",
    role: "admin",
  },
];

export const handlers = [
  http.post("/api/login", () => {
    console.log("로그인");
    return HttpResponse.json(User[0], {
      headers: {
        "Set-Cookie": "connect.sid=msw-cookie;HttpOnly;Path=/",
      },
    });
  }),
  http.post("/api/logout", () => {
    console.log("로그아웃");
    return new HttpResponse(null, {
      headers: {
        "Set-Cookie": "connect.sid=;HttpOnly;Path=/;Max-Age=0",
      },
    });
  }),
  http.post("/api/users", async ({ request }) => {
    console.log("회원가입");
    // return HttpResponse.text(JSON.stringify('user_exists'), {
    //   status: 403,
    // })
    return HttpResponse.text(JSON.stringify("ok"), {
      headers: {
        "Set-Cookie": "connect.sid=msw-cookie;HttpOnly;Path=/;Max-Age=0",
      },
    });
  }),
  http.post("/api/token", async () => {
    // 임의의 토큰 생성
    const fakeToken = faker.string;

    console.log("토큰 발급");
    return HttpResponse.json(
      { token: fakeToken },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }),
];
