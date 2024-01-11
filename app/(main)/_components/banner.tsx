"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface BannerProps {
  documentId: Id<"documents">;
}

export const Banner = ({ documentId }: BannerProps) => {
  const router = useRouter();

  // NOTE: apis for convex
  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const onRemove = () => {
    const promise = remove({ id: documentId });
    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted!",
      error: "Faild to delete note!",
    });

    router.push("/documents");
  };
  const onRestore = () => {
    const promise = restore({ id: documentId });
    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored!",
      error: "Faild to restore note!",
    });
  };

  return (
    <div className="flex gap-x-2 justify-center items-center p-2 w-full text-sm text-center text-white bg-rose-500">
      <p>This page is in the Trash.</p>
      <Button
        size="sm"
        onClick={onRestore}
        variant="outline"
        className="p-1 px-2 h-auto font-normal text-white bg-transparent border-white hover:text-white hover:bg-primary/5"
      >
        Restore page
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          size="sm"
          variant="outline"
          className="p-1 px-2 h-auto font-normal text-white bg-transparent border-white hover:text-white hover:bg-primary/5"
        >
          Delete forever
        </Button>
      </ConfirmModal>
    </div>
  );
};
