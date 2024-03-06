import { http, HttpResponse, StrictResponse } from "msw";
import { faker } from "@faker-js/faker";

const User: User[] = [
  {
    id: "87e9fba7-3733-400b-bb88-866e0fe24541",
    nickname: "Alice",
    image: faker.image.avatar(),
    Followers: [
      { id: "020615f3-87f9-4422-9f92-217b32f25f47" },
      { id: "70f007f5-b16e-4cbc-a00b-3edca6c154a8" },
    ],
    _count: {
      Followers: 2,
      Followings: 4,
    },
  },
];

const Posts = [];

export const handlers = [
  http.post("/api/login", () => {
    console.log("로그인");
    return HttpResponse.json(User[1], {
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
];
