# 배운 점

## DAY4

### 1. nextjs 의 route를 활용한 인증로직 및 소셜로그인 로직 변화

- 기존에 react에서 쓰던 소셜로그인 로직은
  1. 프론트에서 인가코드를 가져오고 백엔드에 전달
  2. 백엔드에서 인가코드로 소셜사에서 토큰을 가져오면서
  3. 토큰으로 사용자정보를 받은후
  4. 인증로직 및 회원가입 로직을 실행한다.
  5. 그후 자체 토큰을 생성하고 프론트에 전달해주는 로직
     이였다.

nextjs 는 클라이언트 컴포넌트 내에서 사용자정보를 가져오면 서버컴포넌트로
내려줄수 없기때문에 프론트 서버내에서 인증로직을 구현해내야했다.
(혹은 부모가 전부 클라이언트이거나)

처음 설계는 간단하게 알고있던 기존 로직대로 수행하되 서버와 프론트클라이언트간의 중간 서버를 route를 만들어서 전달하려고했다. 중간라우트에서 응답값으로 header에 서버로부터 받은 토큰값을 넣고 다시 클라이언트에 내려주는 방법으로하려고했다.

찾아보던중 비슷한 기능을 제공해주는 라이브러리인 nextauth를 알게되었고 이 라이브러리 역시

**중간 라우트를 만들어서 해당 라우트안에 사용자 정보 세션을 생성하고 세션id를 쿠키에 저장해 사용자인증로직을 관리하는 방식**이였다.

당연히 nextjs 프론트와 중간라우트의 origin은
같으니 samsite 기때문에 쿠키사용에 제한은 없었고
아주좋은 인사이트였다.

- 따라서 nextjs 의 springboot와 같은 자체 서버를 사용한다면 credentialProvider를 사용하면 되었고 인증로직을 통과한후에 callback으로 받은 토큰값을 nextauth 토큰타입대로 맞추어 주면 되었다.

- 소셜로그인역시 중간서버와 자체서버로 통신하므로 비교적 보안적으로(브라우저에 안보임) 좋고 기존에 쓰던 로직을 최소화할수있다는 점에 좋다.

바뀐 로직역시 조금 길지만 nextauth가 많이 줄여주었다.

1. 해당소셜Provider를 생성후 클라이언트아이디와 시크릿아이디를 넣어주는것만으로 통신이 완료된다.
2. nextauth 라이브러리가 중간라우트에서 인가코드를 받아옴과 동시에 사용자정보를 가져왔고 세션을 생성하기전 자체서버와 통신하여 사용자정보를 확인 후 자체서버에서 인증로직및 토큰을 가져온다.
3. 해당 토큰은 nextauth 토큰에 덮어쓰고 사용자정보를 세션에 저장후 쿠키에 보관한다.
4. 그이후 해당 사용자세션 즉 정보를 조회할수있는(route) 비동기 Hook 을 자체적으로 만들어주어 클라이언트에서 쉽게 사용자를 확인할수있다.
5. 반대로 서버컴포넌트에서도 자체적으로 확인하여 세션을 확인가능하다.

### 2. user 타입

- nextauth는 자체적으로 User의 타입이 정해져 있었는데 role 이나 token을 받아오고싶었다.
  그러기위해서 타입을 뒤졌으나 없는것을 확인하였고 Docs를 확인해보니 타입을 커스텀해서 쓰라고 적혀있었다.
- 바로 재선언을 해주었다

```ts
import NextAuth, { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      token?: string;
      role?: RoleType;
    } & DefaultSession["user"];
  }

  interface JWT extends DefaultJWT {
    role?: RoleType;
  }

  interface User extends DefaultUser {
    token?: string;
    role?: RoleType;
  }
}
```

## DAY5

trouble

1. nextjs api route에서 next-auth authoption 을 export 하고 세션을 사용하는곳에 임포트를 하여 사용하려 시도 했으나 에러가떴다.

- **해결**
  - nextjs의 route.ts는 http메서드만 내보낼 수 있었다. 별도 파일 분리를 하여 해당 파일에서 임포트

2. 아이디 비밀번호 혹은 소셜로그인 버튼을 눌렀을때에 로딩state 즉, 비동기함수가 끝나도(loading이 false가 되어도) 다음페이지까지가는데에 시간이 걸렸다(아마도 다음페이지를 로드 혹은 다음 페이지에서 쓰는 비동기 컴포넌트에서 가져오는 세션을 로드하는데 걸리는시간)
   그 시간동안 user는 로딩창이 넘어가고도 가만히 로그인창을 보고있었어야했는데 어차피 page를 떠나니까 finally대신 로딩을 계속주었다.
   - 이페이지는 페이지를 떠나면 컴포가 없어지므로 cleanup함수에 써주지않았다.

```tsx
try{
  //...

if(res.ok){

}else if(!res.ok)
  setLoading(false)
}catch(){
  setLoading(false)
}
finally{
// setLoading(false) x
}
```
