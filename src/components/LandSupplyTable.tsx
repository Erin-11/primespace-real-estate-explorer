import React, { useState } from 'react';
import { LandSupply } from '@shared/mock-data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapModal } from '@/components/MapModal';
import { toast } from 'sonner';
import { useDataTable } from '@/hooks/use-data-table';
import { ArrowUpDown, ArrowUp, ArrowDown, MapPin, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
interface LandSupplyTableProps {
  data: LandSupply[];
}
export function LandSupplyTable({ data }: LandSupplyTableProps) {
  const { processedData, filters, sort, setFilter, toggleSort, clearAll } = useDataTable(data, 'projectName');
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const SortIcon = ({ columnKey }: { columnKey: string }) => {
    if (sort.key !== columnKey) return <ArrowUpDown className="ml-2 h-3 w-3 opacity-20" />;
    return sort.direction === 'asc'
      ? <ArrowUp className="ml-2 h-3 w-3 text-primary" />
      : <ArrowDown className="ml-2 h-3 w-3 text-primary" />;
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight">Land Supply Hub</h2>
        <Button variant="outline" size="sm" onClick={() => toast.info("Exporting land data...")} className="h-9 font-bold uppercase text-[10px] tracking-widest gap-2">
          <Download className="h-3.5 w-3.5" /> Export
        </Button>
      </div>
      <Card className="border-border shadow-soft overflow-hidden">
        <div className="overflow-auto max-h-[calc(100vh-320px)] relative">
          <Table className="min-w-[1100px]">
            <TableHeader className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b">
              <TableRow className="hover:bg-transparent">
                {[
                  { key: 'projectName', label: 'Project Name', width: 'w-[280px]' },
                  { key: 'address', label: 'Address', width: 'w-[320px]' },
                  { key: 'usage', label: 'Usage', width: 'w-[140px]' },
                  { key: 'area', label: 'Area', width: 'w-[120px]' },
                  { key: 'year', label: 'Year', width: 'w-[100px]' },
                ].map((col) => (
                  <TableHead key={col.key} className={cn("p-0 h-12", col.width)}>
                    <button
                      onClick={() => toggleSort(col.key)}
                      className="group flex items-center w-full h-full px-4 font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {col.label} <SortIcon columnKey={col.key} />
                    </button>
                  </TableHead>
                ))}
                <TableHead className="w-[120px] p-0">
                  <span className="flex items-center h-full px-4 font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Actions</span>
                </TableHead>
              </TableRow>
              <TableRow className="hover:bg-transparent bg-background/50 border-b sticky top-[48px] z-30 shadow-sm">
                <TableCell className="p-2"><Input placeholder="Project..." className="h-8 text-xs bg-secondary/40" value={filters.projectName || ''} onChange={(e) => setFilter('projectName', e.target.value)} /></TableCell>
                <TableCell className="p-2"><Input placeholder="Address..." className="h-8 text-xs bg-secondary/40" value={filters.address || ''} onChange={(e) => setFilter('address', e.target.value)} /></TableCell>
                <TableCell className="p-2"><Input placeholder="Usage..." className="h-8 text-xs bg-secondary/40" value={filters.usage || ''} onChange={(e) => setFilter('usage', e.target.value)} /></TableCell>
                <TableCell className="p-2"><Input className="h-8 text-xs bg-secondary/40" value={filters.area || ''} onChange={(e) => setFilter('area', e.target.value)} /></TableCell>
                <TableCell className="p-2"><Input className="h-8 text-xs bg-secondary/40" value={filters.year || ''} onChange={(e) => setFilter('year', e.target.value)} /></TableCell>
                <TableCell className="p-2" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {processedData.length > 0 ? (
                processedData.map((land) => (
                  <TableRow key={land.id} className="group hover:bg-accent/40 transition-colors">
                    <TableCell className="px-4 py-3 font-bold text-sm tracking-tight">{land.projectName}</TableCell>
                    <TableCell className="px-4 py-3 text-sm text-muted-foreground font-medium">{land.address}</TableCell>
                    <TableCell className="px-4 py-3">
                      <span className="px-2 py-0.5 bg-primary/5 text-primary text-[10px] font-black uppercase rounded-full border border-primary/10">
                        {land.usage}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm font-mono tracking-tight">{land.area}</TableCell>
                    <TableCell className="px-4 py-3 text-sm font-black text-muted-foreground/60">{land.year}</TableCell>
                    <TableCell className="px-4 py-3">
                      <Button size="sm" variant="ghost" className="h-8 gap-2 font-bold uppercase text-[10px] tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => setSelectedAddress(land.address)}>
                        <MapPin className="h-3 w-3" /> Map
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow><TableCell colSpan={6} className="h-48 text-center text-muted-foreground font-medium">No results found.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
      <MapModal address={selectedAddress || ''} isOpen={!!selectedAddress} onClose={() => setSelectedAddress(null)} />
    </div>
  );
}