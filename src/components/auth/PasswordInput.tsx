import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { PasswordValidation } from "./PasswordValidation";

interface PasswordInputProps {
  password: string;
  onPasswordChange: (value: string) => void;
  showValidation?: boolean;
  passwordStrength?: number;
  validations?: {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    number: boolean;
    special: boolean;
  };
  label?: string;
}

export function PasswordInput({
  password,
  onPasswordChange,
  showValidation = false,
  passwordStrength = 0,
  validations,
  label = "Password"
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 40) return "bg-red-500";
    if (passwordStrength < 60) return "bg-yellow-500";
    if (passwordStrength < 80) return "bg-blue-500";
    return "bg-green-500";
  };

  return (
    <div className="space-y-3">
      <Label htmlFor="password" className="text-base">{label}</Label>
      <div className="relative">
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          className="h-12 text-base px-4"
          required
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-4"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <Eye className="h-5 w-5" />
          ) : (
            <EyeOff className="h-5 w-5" />
          )}
        </Button>
      </div>

      {showValidation && validations && (
        <div className="mt-3 space-y-3">
          <div className="space-y-2">
            <Progress value={passwordStrength} className={`h-2 ${getPasswordStrengthColor()}`} />
            <p className="text-sm text-gray-500">
              Password strength: {passwordStrength < 40 ? 'Weak' : passwordStrength < 60 ? 'Fair' : passwordStrength < 80 ? 'Good' : 'Strong'}
            </p>
          </div>
          <PasswordValidation validations={validations} />
        </div>
      )}
    </div>
  );
}
