import dynamic from "next/dynamic";

const ClipLoader = dynamic(() => import("react-spinners/ClipLoader"), {
  ssr: false,
});

export default ClipLoader;
