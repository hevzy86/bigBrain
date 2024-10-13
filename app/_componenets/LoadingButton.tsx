import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React, { ReactNode } from "react";

export default function LoadingButton({
  isLoading,
  children,
  loadingText,
}: {
  isLoading: boolean;
  children: ReactNode;
  loadingText?: string;
}) {
  return (
    <Button
      className="flex gap-2 items-center "
      disabled={isLoading} // Disables button while submitting
      type="submit"
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" /> {loadingText}
        </>
        
      ) : (
        children
      )}
    </Button>
  );
}
