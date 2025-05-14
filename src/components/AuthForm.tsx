import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ForgotPasswordFlow } from "./ForgotPasswordFlow";
import { PasswordInput } from "./auth/PasswordInput";
import { IdDocumentUpload } from "./auth/IdDocumentUpload";
interface AuthFormProps {
  type: "login" | "signup";
  role: "buyer" | "seller" | "middleman" | "admin";
  onSuccess?: (userData: { name: string, email: string, password: string }) => void;
}
export function AuthForm({
  type,
  role,
  onSuccess
}: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [idDocument, setIdDocument] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });
  const [expertise, setExpertise] = useState("");
  const [proofImage, setProofImage] = useState<File | null>(null);
  const navigate = useNavigate();

  // Admin credentials
  const adminCredentials = {
    email: "admin@sellmate.com",
    password: "Admin@123"
  };
  useEffect(() => {
    if (role === "admin" && type === "signup") {
      navigate("/login/admin");
    }
  }, [role, type, navigate]);
  useEffect(() => {
    if (password) {
      const validations = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password)
      };
      setPasswordValidations(validations);
      const validCount = Object.values(validations).filter(Boolean).length;
      setPasswordStrength(validCount * 20);
    } else {
      setPasswordStrength(0);
      setPasswordValidations({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false
      });
    }
  }, [password]);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIdDocument(e.target.files[0]);
      toast.success(`File "${e.target.files[0].name}" uploaded successfully`);
    }
  };
  const handleProofImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProofImage(e.target.files[0]);
      toast.success(`Proof image "${e.target.files[0].name}" uploaded successfully`);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (!email || !password) {
      toast.error("Please fill in all required fields");
      setIsLoading(false);
      return;
    }
    if (type === "login" && email === adminCredentials.email && password === adminCredentials.password) {
      setTimeout(() => {
        setIsLoading(false);
        toast.success("Admin logged in successfully");
        navigate("/dashboard/admin");
      }, 1500);
      return;
    }
    if (type === "signup") {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        setIsLoading(false);
        return;
      }
      if (passwordStrength < 60) {
        toast.error("Password does not meet minimum security requirements");
        setIsLoading(false);
        return;
      }
      if (role === "middleman") {
        if (!idDocument) {
          toast.error(`Valid ID document is required for ${role} registration`);
          setIsLoading(false);
          return;
        }
        if (!expertise.trim()) {
          toast.error("Please enter your expertise");
          setIsLoading(false);
          return;
        }
        if (!proofImage) {
          toast.error("Please upload a proof image of your expertise");
          setIsLoading(false);
          return;
        }
      }
    }
    setTimeout(() => {
      setIsLoading(false);
      if (type === "login") {
        toast.success("Logged in successfully");
        if (onSuccess) onSuccess({ name, email, password });
      } else {
        toast.success("Account created successfully");
        if (onSuccess) onSuccess({ name, email, password });
      }
    }, 1500);
  };
  return <form onSubmit={handleSubmit} className="space-y-6">
      {type === "signup" && <div className="space-y-3">
          <Label htmlFor="name" className="text-base">Full Name</Label>
          <Input id="name" placeholder="Enter your name" value={name} onChange={e => setName(e.target.value)} className="h-12 text-base px-4" />
        </div>}
      
      <div className="space-y-3">
        <Label htmlFor="email" className="text-base">Email</Label>
        <Input id="email" type="email" placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)} className="h-12 text-base px-4" required />
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label htmlFor="password" className="text-base">
        </Label>
          {type === "login" && <Dialog>
              <DialogTrigger asChild>
                <Button variant="link" className="text-sm text-primary hover:underline p-0 h-auto font-normal">
                  Forgot password?
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Reset Password</DialogTitle>
                  <DialogDescription>
                    Follow the steps below to reset your password securely.
                  </DialogDescription>
                </DialogHeader>
                <ForgotPasswordFlow />
              </DialogContent>
            </Dialog>}
        </div>

        <PasswordInput password={password} onPasswordChange={setPassword} showValidation={type === "signup"} passwordStrength={passwordStrength} validations={passwordValidations} />
      </div>
      
      {type === "signup" && <>
          <PasswordInput password={confirmPassword} onPasswordChange={setConfirmPassword} label="Confirm Password" />

          {role === "middleman" && <>
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
                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" /></svg>
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
                  Please upload an image that proves your expertise (e.g., certificate, award, work sample)
                </p>
              </div>
            </div>
          </>}
        </>}
      
      <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={isLoading}>
        {isLoading ? "Processing..." : type === "login" ? "Login" : "Create Account"}
      </Button>
    </form>;
}