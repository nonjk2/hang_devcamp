import { z } from "zod";

const Signfields = [
  {
    name: "이름",
    placeholder: "홍길동",
  },
  {
    name: "이메일",
    placeholder: "hello@sparta-devcamp.com",
  },
  {
    name: "연락처",
    placeholder: "01000000000",
  },
];

const Passwordfields = [
  {
    name: "비밀번호",
  },
  {
    name: "비밀번호확인",
  },
];

const CouponSchemas = z.object({
  쿠폰타입: z.enum(["fixedAmount", "percentDiscount"], {
    required_error: "쿠폰타입을 선택해주세요.",
  }),
  쿠폰설명: z.string().min(2, { message: "설명은 2글자 이상이어야 합니다." }),
  쿠폰할인율: z.string().min(2, { message: "쿠폰할인값을 적어주세요" }),
  쿠폰넘버: z
    .string()
    .min(10, { message: "쿠폰번호는 10글자 이상이어야 합니다." }),
});

const Counponfield = [
  {
    name: "쿠폰넘버",
    placeholder: "012034012040",
  },
  {
    name: "쿠폰설명",
    placeholder: "50프로 할인쿠폰입니다.",
  },
  {
    name: "쿠폰할인율",
    placeholder: "숫자로 입력해주세요",
  },
];

const SignformSchema = z
  .object({
    이름: z.string().min(2, { message: "이름은 2글자 이상이어야 합니다." }),
    이메일: z.string().email({ message: "올바른 이메일을 입력해주세요." }),
    연락처: z
      .string()
      .length(11, { message: "연락처는 11자리여야 합니다." })
      .refine((val) => val.startsWith("010"), {
        message: "연락처는 '010'으로 시작해야 합니다.",
      }),
    역할: z.enum(["관리자", "일반사용자"], {
      required_error: "역할을 선택해주세요.",
    }),
    비밀번호: z
      .string()
      .min(8, { message: "비밀번호는 8 자리 이상이어야합니다." })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
        message: "비밀번호는 숫자, 영문자, 특수문자를 포함해야 합니다.",
      }),
    비밀번호확인: z
      .string()
      .min(8, { message: "비밀번호는 8 자리 이상이어야합니다." })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
        message: "비밀번호는 숫자, 영문자, 특수문자를 포함해야 합니다.",
      })
      .optional(),
  })
  .refine((data) => data.비밀번호 === data.비밀번호확인, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["비밀번호확인"],
  });

const SignInFormSchema = z.object({
  이메일: z.string().email({ message: "올바른 이메일을 입력해주세요." }),
  비밀번호: z
    .string()
    .min(8, { message: "비밀번호는 8 자리 이상이어야합니다." }),
});
const googleClientID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";
const googleClientSecret = process.env.NEXT_PUBLIC_GOOGLE_SECRET_ID ?? "";
const githubClientID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID ?? "";
const githubClientSecret = process.env.NEXT_PUBLIC_GITHUB_SECRET_ID ?? "";
const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseKEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
export {
  Counponfield,
  CouponSchemas,
  Signfields,
  SignformSchema,
  Passwordfields,
  SignInFormSchema,
  googleClientID,
  googleClientSecret,
  githubClientID,
  githubClientSecret,
  supabaseURL,
  supabaseKEY,
  supabaseAnon,
};
