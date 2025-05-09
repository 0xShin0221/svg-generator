import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface NotifyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  googleFormUrl?: string;
}

export const NotifyModal: React.FC<NotifyModalProps> = ({
  open,
  onOpenChange,
  googleFormUrl = "https://forms.gle/LQ6rvaBPYWiC5qwK7",
}) => {
  const t = useTranslations("NotifyModal");
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>
        <Button asChild className="w-full mt-4" variant="default">
          <a href={googleFormUrl} target="_blank" rel="noopener noreferrer">
            {t("form_button")}
          </a>
        </Button>
        <DialogClose asChild>
          <Button className="w-full mt-2" variant="outline">
            {t("close")}
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
