
import { CheckCircle2, XCircle } from "lucide-react";

interface PasswordValidationProps {
  validations: {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    number: boolean;
    special: boolean;
  };
}

export function PasswordValidation({ validations }: PasswordValidationProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
      <div className="flex items-center gap-2 text-sm">
        {validations.length ? 
          <CheckCircle2 className="h-4 w-4 text-green-500" /> : 
          <XCircle className="h-4 w-4 text-red-500" />}
        <span>At least 8 characters</span>
      </div>
      
      <div className="flex items-center gap-2 text-sm">
        {validations.uppercase ? 
          <CheckCircle2 className="h-4 w-4 text-green-500" /> : 
          <XCircle className="h-4 w-4 text-red-500" />}
        <span>Uppercase letter</span>
      </div>
      
      <div className="flex items-center gap-2 text-sm">
        {validations.lowercase ? 
          <CheckCircle2 className="h-4 w-4 text-green-500" /> : 
          <XCircle className="h-4 w-4 text-red-500" />}
        <span>Lowercase letter</span>
      </div>
      
      <div className="flex items-center gap-2 text-sm">
        {validations.number ? 
          <CheckCircle2 className="h-4 w-4 text-green-500" /> : 
          <XCircle className="h-4 w-4 text-red-500" />}
        <span>At least 1 number</span>
      </div>
      
      <div className="flex items-center gap-2 text-sm">
        {validations.special ? 
          <CheckCircle2 className="h-4 w-4 text-green-500" /> : 
          <XCircle className="h-4 w-4 text-red-500" />}
        <span>Special character</span>
      </div>
    </div>
  );
}
