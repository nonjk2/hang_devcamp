import ClipLoader from "react-spinners/ClipLoader";

const loading = () => {
  return (
    <div className="flex items-center justify-center h-[300px] pb-4">
      <ClipLoader color="#36d7b7" />
    </div>
  );
};
export default loading;
