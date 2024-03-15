import { Skeleton } from "../skeleton";

const CheckOutSkeleton = () => {
  return (
    <>
      <div className="flex flex-col gap-4 grow">
        <Skeleton className="w-[500px] h-[315px]" />
        <Skeleton className="w-[500px] h-[162px]" />
        <Skeleton className="w-[500px] h-[238px]" />
        <Skeleton className="w-[500px] h-[408px]" />
      </div>
      <div className="flex flex-col gap-4">
        <Skeleton className="w-[350px] h-[302px]" />
        <Skeleton className="w-[350px] h-[388px]" />
        <Skeleton className="w-[350px] h-[130px]" />
      </div>
    </>
  );
};
export default CheckOutSkeleton;
