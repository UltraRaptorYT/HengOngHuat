import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import "@/CustomButton.css";
import { cn } from "@/lib/utils";

export default function CustomButton({
  children,
  clickHandler,
  className,
}: {
  children: ReactNode;
  clickHandler?: () => void;
  className?: string;
}) {
  return (
    <Button
      onClick={clickHandler}
      className={cn(
        "w-full goldLinearBackground text-white text-xl inline-flex items-center justify-center whitespace-nowrap rounded-xl font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-4 border-white bg-white hover:bg-slate-100 hover:text-white h-full px-4 py-3",
        className
      )}
      variant={"outline"}
    >
      {children}
    </Button>
  );
}
