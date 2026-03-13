import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
interface MapModalProps {
  address: string;
  isOpen: boolean;
  onClose: () => void;
}
export function MapModal({ address, isOpen, onClose }: MapModalProps) {
  const encodedAddress = encodeURIComponent(address);
  const mapUrl = `https://www.google.com/maps?q=${encodedAddress}&output=embed`;
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-4xl p-0 overflow-hidden border-none shadow-glass">
        <DialogHeader className="p-4 border-b bg-background">
          <DialogTitle className="text-lg font-medium truncate pr-8">
            Location Explorer: {address}
          </DialogTitle>
        </DialogHeader>
        <div className="bg-muted">
          <AspectRatio ratio={16 / 9}>
            {address ? (
              <iframe
                title={`Map of ${address}`}
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src={mapUrl}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Invalid Address
              </div>
            )}
          </AspectRatio>
        </div>
      </DialogContent>
    </Dialog>
  );
}