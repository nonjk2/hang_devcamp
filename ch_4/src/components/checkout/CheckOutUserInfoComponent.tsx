import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

const CheckOutUserInfoComponent = ({ user }: { user: User }) => {
  return (
    <Card className="rounded-sm">
      <CardHeader>
        <CardTitle className="text-lg">주문자 정보</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-2 mt-3 justify-between">
        <div className="flex flex-col">
          <div className="">{user.nickname}</div>
          {user.phone && <div className="">{user.phone}</div>}
          <div className="">{user.email}</div>
        </div>
        <div></div>
      </CardContent>
    </Card>
  );
};
export default CheckOutUserInfoComponent;
