import { ReactNode } from "react";

export default function CVPageLayout({
  leftPanel,
  rightPanel,
}: {
  leftPanel: ReactNode;
  rightPanel: ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-muted text-foreground">
      <div className="w-full md:w-1/2 border-r border-border p-6 overflow-y-auto">
        {leftPanel}
      </div>

      <div className="w-full md:w-1/2 p-6 overflow-y-auto bg-background">
        {rightPanel}
      </div>
    </div>
  );
}
