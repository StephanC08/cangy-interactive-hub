
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

const DashboardSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 space-y-4 md:space-y-0">
        <div>
          <Skeleton className="h-10 w-64 bg-noir-light mb-2" />
          <Skeleton className="h-5 w-48 bg-noir-light" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-40 bg-noir-light" />
        ))}
      </div>
      
      <Skeleton className="h-80 w-full bg-noir-light mb-8" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-56 bg-noir-light" />
        ))}
      </div>
    </div>
  );
};

export default DashboardSkeleton;
