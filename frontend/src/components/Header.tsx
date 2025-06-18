"use client";

import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full sticky bg-green-800 text-primary-foreground py-4 shadow-sm border-b border-border">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Leaf className="w-6 h-6 text-primary-foreground" />
          <h1 className="text-xl font-bold">CV Optimizer</h1>
        </div>
        <Button
          variant="outline"
          className="text-secondary-foreground hover:bg-green-900 hover:text-primary-foreground hover:border-green-900"
        >
          Ayuda
        </Button>
      </div>
    </header>
  );
}
