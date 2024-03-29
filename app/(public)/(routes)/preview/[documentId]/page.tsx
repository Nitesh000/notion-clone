"use client";

import { Cover } from "@/components/cover";
import { Toolbar } from "@/components/toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import { useMemo } from "react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}
const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor"), { ssr: false }),
    [],
  );
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });

  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="mx-auto mt-10 md:max-w-3xl lg:max-w-4xl">
          <div className="pt-4 pl-8 space-y-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return <div>Not found!</div>;
  }

  return (
    <div className="pb-40">
      <Cover url={document.coverImage} preview />
      <div className="mx-auto md:max-w-3xl lg:max-w-4xl">
        <Toolbar initialData={document} preview />
        <Editor
          editable={false}
          onChange={() => {}}
          initialContent={document.content}
        />
      </div>
    </div>
  );
};

export default DocumentIdPage;
