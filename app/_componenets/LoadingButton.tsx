import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React, { ReactNode } from "react";

export default function LoadingButton({
  isLoading,
  children,
  loadingText,
  onClick,
}: {
  isLoading: boolean;
  children: ReactNode;
  loadingText?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) {
  return (
    <Button
      className="flex gap-2 items-center "
      disabled={isLoading} // Disables button while submitting
      type="submit"
      onClick={(e) => {
        onClick?.(e);
      }}
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
