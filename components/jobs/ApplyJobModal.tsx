"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useAuth } from "@/contexts/EmployerAuthContext";
import { createJobApplication } from "@/lib/api";
import { CheckCircle } from "lucide-react";

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
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!jobId || !user || !token) return;
    setSubmitting(true);
    setError(null);
    try {
      await createJobApplication({
        job: jobId,
        resumeUrl: resumeUrl || undefined,
        coverLetter: coverLetter || undefined,
      }, token);
      setShowSuccess(true);
      // Auto close after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
        // Reset form
        setResumeUrl("");
        setCoverLetter("");
      }, 3000);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
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
            <Button onClick={handleSubmit} disabled={submitting || !user || !token}>
              {submitting ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={showSuccess} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center text-center space-y-4 py-6">
            <CheckCircle className="h-16 w-16 text-green-500" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Application Successful!</h3>
              <p className="text-sm text-gray-600 mt-2">
                Your job application has been submitted successfully. We'll review your application and get back to you soon.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ApplyJobModal; 