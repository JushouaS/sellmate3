import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./button";

export function BackButton() {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      className="fixed top-4 left-4 p-2 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors z-50"
      onClick={() => navigate(-1)}
    >
      <ArrowLeft className="h-5 w-5" />
    </Button>
  );
} 