import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingComp = () => (
  <div className="p-2">
    <Skeleton baseColor="#f0f0f0" highlightColor="#e0e0e0"  width={180}  height={100} />
    <Skeleton baseColor="#f0f0f0" highlightColor="#e0e0e0" width={100}  height={10} />
    <Skeleton baseColor="#f0f0f0" highlightColor="#e0e0e0" width={80}  height={8} />
  </div>
);

export const Loading = ({ count }: { count: number }) => {
  return (
    <div className="flex flex-wrap items-center justify-center">
      {Array.from({ length: count }).map((_, idx) => (
        <LoadingComp key={idx} />
      ))}
    </div>
  );
};
