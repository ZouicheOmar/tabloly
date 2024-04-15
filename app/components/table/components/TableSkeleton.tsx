/** @format */
import {Skeleton} from "@/components/ui/skeleton"

const TableSkeleton = () => (
  <div className="w-full">
    <div className="w-full py-2 flex justify-between items-center ">
      <Skeleton className="w-[6rem] h-[2rem] rounded-md" />
      <div className="  flex gap-2">
        <Skeleton className="w-[5rem] h-[2rem] rounded-md" />
        <Skeleton className="w-[5rem] h-[2rem] rounded-md" />
        <Skeleton className="w-[5rem] h-[2rem] rounded-md" />
        <Skeleton className="w-[5rem] h-[2rem] rounded-md" />
      </div>
    </div>
    <div className="space-y-2">
      <Skeleton className="w-full h-[2rem] rounded-md" />
      <Skeleton className="w-full h-[2rem] rounded-md" />
      <Skeleton className="w-full h-[2rem] rounded-md" />
      <Skeleton className="w-full h-[2rem] rounded-md" />
      <Skeleton className="w-full h-[2rem] rounded-md" />
      <Skeleton className="w-full h-[2rem] rounded-md" />
      <Skeleton className="w-full h-[2rem] rounded-md" />
      <Skeleton className="w-full h-[2rem] rounded-md" />
      <Skeleton className="w-full h-[2rem] rounded-md" />
    </div>
  </div>
)

export default TableSkeleton
