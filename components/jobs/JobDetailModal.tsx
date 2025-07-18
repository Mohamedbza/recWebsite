"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, CalendarDays } from "lucide-react";
import React from "react";

export interface JobDetail {
  _id: string;
  title: string;
  description: string;
  companyId: {
    name: string;
    logo?: string;
  };
  location: string;
  jobType: string;
  salary?: string;
  createdAt: string;
  skills?: string[];
  experienceLevel?: string;
}

interface JobDetailModalProps {
  open: boolean;
  job: JobDetail | null;
  onClose: () => void;
  onApply: (job: JobDetail) => void;
}

const JobDetailModal: React.FC<JobDetailModalProps> = ({ open, job, onClose, onApply }) => {
  if (!job) return null;

  const getLocationDisplayName = (loc: string) => {
    const map: Record<string, string> = {
      montreal: "Canada",
      dubai: "UAE",
      turkey: "Turkey",
    };
    return map[loc] || loc;
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-3xl sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>{job.title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-6">
            {/* Basic info */}
            <div className="space-y-1">
              <p className="text-muted-foreground text-sm">{job.companyId.name}</p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {getLocationDisplayName(job.location)}
                </span>
                <span className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-1" />
                  {job.jobType}
                </span>
                {job.salary && <span>{job.salary}</span>}
              </div>
            </div>

            {/* Skills */}
            {job.skills && job.skills.length > 0 && (
              <div>
                <h3 className="text-base font-medium mb-2">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((s, i) => (
                    <Badge key={i} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div>
              <h3 className="text-base font-medium mb-2">Description</h3>
              <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                {job.description}
              </p>
            </div>
          </div>
        </ScrollArea>
        <div className="flex justify-between items-center pt-4">
          <span className="text-xs text-muted-foreground flex items-center">
            <CalendarDays className="h-4 w-4 mr-1" />
            Posted {new Date(job.createdAt).toLocaleDateString()}
          </span>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button onClick={() => onApply(job)}>
              Apply Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailModal; 