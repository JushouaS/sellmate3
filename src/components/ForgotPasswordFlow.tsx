
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Mail, ArrowRight, KeyRound } from "lucide-react";
import { toast } from "sonner";

type Step = "verify-email" | "enter-code" | "new-password" | "new-email";

export function ForgotPasswordFlow() {
  const [step, setStep] = useState<Step>("verify-email");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleVerifyEmail = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending verification code
    toast.success("Verification code sent to " + email);
    setStep("enter-code");
  };

  const handleVerifyCode = (code: string) => {
    setVerificationCode(code);
    if (code.length === 6) {
      // Simulate code verification
      toast.success("Email verified successfully");
      setStep("new-password");
    }
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate password update
    toast.success("Password updated successfully");
    // Here you would typically redirect to login
  };

  const handleUpdateEmail = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate email update
    toast.success("Email updated successfully");
    setStep("verify-email");
  };

  return (
    <div className="space-y-6">
      {step === "verify-email" && (
        <form onSubmit={handleVerifyEmail} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Enter your registered email</Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Send Verification Code <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <div className="text-sm text-gray-500 text-center">
            We'll send a verification code to this email
          </div>
        </form>
      )}

      {step === "enter-code" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Enter verification code</Label>
            <InputOTP
              maxLength={6}
              value={verificationCode}
              onChange={(value) => handleVerifyCode(value)}
              render={({ slots }) => (
                <InputOTPGroup>
                  {slots.map((slot, i) => (
                    <InputOTPSlot key={i} {...slot} index={i} />
                  ))}
                </InputOTPGroup>
              )}
            />
          </div>
          <div className="text-sm text-gray-500 text-center">
            Enter the 6-digit code sent to {email}
          </div>
          <Button
            variant="link"
            className="w-full"
            onClick={() => setStep("verify-email")}
          >
            Use a different email address
          </Button>
        </div>
      )}

      {step === "new-password" && (
        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="newPassword">Enter new password</Label>
            <div className="relative">
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="pl-10"
                required
              />
              <KeyRound className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Update Password
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setStep("new-email")}
          >
            Update Email Instead
          </Button>
        </form>
      )}

      {step === "new-email" && (
        <form onSubmit={handleUpdateEmail} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="newEmail">Enter new email</Label>
            <div className="relative">
              <Input
                id="newEmail"
                type="email"
                placeholder="name@example.com"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="pl-10"
                required
              />
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Update Email
          </Button>
        </form>
      )}
    </div>
  );
}
