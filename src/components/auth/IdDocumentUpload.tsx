
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface IdDocumentUploadProps {
  idDocument: File | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function IdDocumentUpload({ idDocument, onFileChange }: IdDocumentUploadProps) {
  return (
    <div className="space-y-3">
      <Label htmlFor="idDocument" className="text-base">Valid ID Document</Label>
      <div className="border border-input rounded-md p-4">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 text-base"
            onClick={() => document.getElementById("idDocument")?.click()}
          >
            <Upload className="h-5 w-5 mr-2" />
            {idDocument ? 'Change File' : 'Upload ID'}
          </Button>
          {idDocument && (
            <span className="text-sm text-gray-500 truncate max-w-[200px]">
              {idDocument.name}
            </span>
          )}
        </div>
        <Input
          id="idDocument"
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          className="hidden"
          onChange={onFileChange}
        />
        <p className="text-sm text-gray-500 mt-3">
          Please upload a valid government-issued ID (passport, driver's license, national ID card)
        </p>
      </div>
    </div>
  );
}
