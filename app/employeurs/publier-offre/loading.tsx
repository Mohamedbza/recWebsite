"use client"

import { Skeleton } from "@/components/ui/skeleton"

export default function PublierOffreLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="relative py-12 md:py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-background/80 to-primary/20 z-0"></div>

          <div className="container relative z-10">
            <div className="text-center mb-8">
              <Skeleton className="h-10 w-72 mx-auto mb-2" />
              <Skeleton className="h-6 w-96 mx-auto" />
            </div>

            <div className="max-w-3xl mx-auto bg-background/80 backdrop-blur-md rounded-xl shadow-xl border border-white/20 p-6">
              {/* Job Information Section */}
              <div className="mb-8">
                <Skeleton className="h-7 w-48 mb-4" />
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-24" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-28" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-36" />
                    <Skeleton className="h-32 w-full" />
                  </div>
                  
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-24 w-full" />
                  </div>
                  
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-24 w-full" />
                  </div>
                  
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-24" />
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Skeleton className="h-8 w-20 rounded-full" />
                      <Skeleton className="h-8 w-24 rounded-full" />
                      <Skeleton className="h-8 w-16 rounded-full" />
                    </div>
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              </div>

              {/* Application Information */}
              <div className="mb-8">
                <Skeleton className="h-7 w-48 mb-4" />
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-wrap gap-4 justify-between pt-4">
                <div className="flex flex-wrap gap-3">
                  <Skeleton className="h-10 w-32" />
                  <Skeleton className="h-10 w-28" />
                </div>
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}