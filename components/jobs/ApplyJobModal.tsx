"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useAuth } from "@/contexts/EmployerAuthContext";

interface ApplyJobModalProps {
  open: boolean;
  jobId: string | null;
  onClose: () => void;
}

const ApplyJobModal: React.FC<ApplyJobModalProps> = ({ open, jobId, onClose }) => {
  const { user, token } = useAuth();
  const [resumeUrl, setResumeUrl] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!jobId || !user) return;
    setSubmitting(true);
    setError(null);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
      const resp = await fetch(`${apiUrl}/job-applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          candidate: user.id,
          job: jobId,
          resumeUrl,
          coverLetter,
          location: user.location,
        }),
      });
      if (!resp.ok) {
        const data = await resp.json();
        throw new Error(data.message || "Failed to apply");
      }
      onClose();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Apply for Job</DialogTitle>
        </DialogHeader>
        {error && <p className="text-destructive text-sm mb-2">{error}</p>}
        <div className="space-y-4">
          <Input
            placeholder="Resume URL (optional)"
            value={resumeUrl}
            onChange={(e) => setResumeUrl(e.target.value)}
          />
          <Textarea
            placeholder="Cover Letter (optional)"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            rows={4}
          />
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={submitting || !user}>
            {submitting ? "Submitting..." : "Submit Application"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyJobModal; 