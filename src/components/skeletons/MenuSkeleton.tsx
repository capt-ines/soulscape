import { Skeleton } from "../ui/skeleton";

export const MenuSkeleton = () => {
  return (
    <div className="fixed top-7 right-8 md:top-8 md:right-13">
      <Skeleton className="h-8 md:w-48" />
    </div>
  );
};
