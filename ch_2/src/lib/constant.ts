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
      })
      .optional(),
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

export { Signfields, SignformSchema, Passwordfields, SignInFormSchema };
