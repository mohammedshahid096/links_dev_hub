import React from "react";

const SidebarSkeleton = () => {
  return (
    <div className="flex h-screen w-64 flex-col bg-white shadow-lg">
      {/* Header Skeleton */}
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-lg bg-gray-200 animate-pulse" />
          <div className="space-y-2 flex-1">
            <div className="h-4 w-3/4 rounded bg-gray-200 animate-pulse" />
            <div className="h-3 w-1/2 rounded bg-gray-200 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Main Navigation Skeleton */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Main Nav Section */}
        <div className="space-y-4">
          <div className="h-4 w-24 rounded bg-gray-200 animate-pulse" />

          {/* Nav Items */}
          <div className="space-y-3">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center space-x-3 p-2 rounded-lg">
                  <div className="h-5 w-5 rounded bg-gray-200 animate-pulse" />
                  <div className="h-4 w-24 rounded bg-gray-200 animate-pulse" />
                </div>

                {/* Submenu Items */}
                <div className="ml-9 space-y-3">
                  {[...Array(3)].map((_, subIndex) => (
                    <div
                      key={subIndex}
                      className="h-4 w-32 rounded bg-gray-100 animate-pulse"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Access Section */}
        <div className="space-y-4">
          <div className="h-4 w-24 rounded bg-gray-200 animate-pulse" />

          {/* Quick Access Items */}
          <div className="space-y-3">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-2 rounded-lg"
              >
                <div className="h-5 w-5 rounded bg-gray-200 animate-pulse" />
                <div className="h-4 w-28 rounded bg-gray-200 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer User Profile Skeleton */}
      <div className="border-t p-4">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-lg bg-gray-200 animate-pulse" />
          <div className="space-y-2 flex-1">
            <div className="h-4 w-20 rounded bg-gray-200 animate-pulse" />
            <div className="h-3 w-24 rounded bg-gray-200 animate-pulse" />
          </div>
          <div className="h-4 w-4 rounded bg-gray-200 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

const AdminSkeletonLoading = () => {
  return (
    <div className="flex h-screen w-full">
      <SidebarSkeleton />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
        </div>
        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
      </div>
    </div>
  );
};
export default AdminSkeletonLoading;
