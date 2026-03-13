import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, ExternalLink, Loader2 } from "lucide-react";
interface MapModalProps {
  address: string;
  isOpen: boolean;
  onClose: () => void;
}
export function MapModal({ address, isOpen, onClose }: MapModalProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const encodedAddress = encodeURIComponent(address);
  const mapUrl = `https://www.google.com/maps?q=${encodedAddress}&output=embed`;
  useEffect(() => {
    if (!isOpen) {
      setIsLoaded(false);
    }
  }, [isOpen]);
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-4xl p-0 overflow-hidden border-none shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
        <DialogHeader className="p-5 border-b bg-background flex flex-row items-center justify-between space-y-0">
          <DialogTitle className="text-base font-bold flex items-center gap-2 truncate pr-4">
            <MapPin className="w-4 h-4 text-primary shrink-0" />
            <span className="truncate">{address || 'Location Explorer'}</span>
          </DialogTitle>
          <DialogDescription className="sr-only">
            Interactive Google Map showing the location of {address}
          </DialogDescription>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold uppercase tracking-tighter text-muted-foreground hover:text-primary flex items-center gap-1 shrink-0 transition-colors"
          >
            Open Maps <ExternalLink className="w-3 h-3" />
          </a>
        </DialogHeader>
        <div className="bg-muted relative group">
          <AspectRatio ratio={16 / 9} className="sm:aspect-video aspect-[4/3]">
            {!isLoaded && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-secondary/50 backdrop-blur-sm">
                <Loader2 className="w-8 h-8 text-primary/40 animate-spin mb-2" />
                <Skeleton className="w-full h-full absolute inset-0 -z-10" />
              </div>
            )}
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
                onLoad={() => setIsLoaded(true)}
                referrerPolicy="no-referrer-when-downgrade"
                className="transition-opacity duration-500"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground bg-secondary">
                <p className="font-medium">Invalid or missing address data</p>
              </div>
            )}
          </AspectRatio>
        </div>
      </DialogContent>
    </Dialog>
  );
}