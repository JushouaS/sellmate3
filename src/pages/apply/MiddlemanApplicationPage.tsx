import { useLocation, useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/AuthLayout";
import { useState } from "react";
import { IdDocumentUpload } from "@/components/auth/IdDocumentUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion } from "framer-motion";

const MiddlemanApplicationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Get user info from location state
  const { name, email, password } = location.state || {};

  // Middleman-specific fields
  const [idDocument, setIdDocument] = useState<File | null>(null);
  const [expertise, setExpertise] = useState("");
  const [proofImage, setProofImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIdDocument(e.target.files[0]);
    }
  };
  const handleProofImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProofImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (!idDocument || !expertise.trim() || !proofImage) {
      setIsLoading(false);
      return;
    }
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccessModal(true);
    }, 1200);
  };

  return (
    <AuthLayout
      title="Middleman Application"
      subtitle="Apply to become a middleman by completing the form below."
      className="bg-gradient-to-r from-blue-50 to-indigo-50"
      showBackLink={true}
      backLinkUrl="/signup"
      backLinkText=""
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3">
          <Label className="text-base">Full Name</Label>
          <Input value={name || ""} readOnly className="h-12 text-base px-4 bg-gray-100" />
        </div>
        <div className="space-y-3">
          <Label className="text-base">Email</Label>
          <Input value={email || ""} readOnly className="h-12 text-base px-4 bg-gray-100" />
        </div>
        <div className="space-y-3">
          <Label className="text-base">Password</Label>
          <div className="relative">
            <Input value={password || ""} readOnly type={showPassword ? "text" : "password"} className="h-12 text-base px-4 bg-gray-100 pr-12" />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-4"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        <IdDocumentUpload idDocument={idDocument} onFileChange={handleFileChange} />
        <div className="space-y-3">
          <Label htmlFor="expertise" className="text-base">Expertise</Label>
          <Input id="expertise" placeholder="e.g. Electronics, Cars, Luxury Goods" value={expertise} onChange={e => setExpertise(e.target.value)} className="h-12 text-base px-4" />
        </div>
        <div className="space-y-3">
          <Label htmlFor="proofImage" className="text-base">Proof of Expertise</Label>
          <div className="border border-input rounded-md p-4">
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 text-base"
                onClick={() => document.getElementById('proofImage')?.click()}
              >
                {proofImage ? 'Change File' : 'Upload File'}
              </Button>
              {proofImage && (
                <span className="text-sm text-gray-500 truncate max-w-[200px]">
                  {proofImage.name}
                </span>
              )}
            </div>
            <Input
              id="proofImage"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProofImageChange}
            />
            <p className="text-sm text-gray-500 mt-3">
              Please upload a file that proves your expertise (e.g., certificate, award, work sample)
            </p>
          </div>
        </div>
        <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={isLoading}>
          {isLoading ? "Processing..." : "Submit Application"}
        </Button>
      </form>
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="max-w-md p-8 rounded-2xl shadow-2xl flex flex-col items-center bg-white">
          <motion.div
            initial={{ scale: 0, rotate: -30, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="mb-4"
          >
            <div className="flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 shadow-lg">
              <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="22" stroke="currentColor" strokeOpacity="0.15" fill="none" />
                <motion.path
                  d="M16 24l7 7 9-13"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                />
              </svg>
            </div>
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Your application has been submitted!</h2>
          <p className="text-gray-600 text-center mb-6">Please wait 48 hours and check your email to see if you are hired.</p>
          <Button
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-lg text-lg shadow-md hover:from-blue-700 hover:to-purple-700 transition"
            onClick={() => navigate("/")}
          >
            Go to Home
          </Button>
        </DialogContent>
      </Dialog>
    </AuthLayout>
  );
};

export default MiddlemanApplicationPage; 