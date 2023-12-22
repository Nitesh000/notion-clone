"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Heading = () => {
  return (
    <div className="space-y-4 max-w-3xl">
      <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl">
        Your Ideas, Document, & Plans. Unified. Welcome to{" "}
        <span className="underline">Jotion</span>
      </h1>
      <h3 className="text-base font-medium sm:text-xl md:text-2xl">
        Jotion is the connected workspace where <br /> better, faster work
        happens.
      </h3>
      <Button>
        Enter Jotion
        <ArrowRight className="ml-2 w-4 h-4" />
      </Button>
    </div>
  );
};
