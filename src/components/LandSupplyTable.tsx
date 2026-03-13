import React, { useState } from 'react';
import { LandSupply } from '@shared/mock-data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapModal } from '@/components/MapModal';
import { toast } from 'sonner';
import { useDataTable } from '@/hooks/use-data-table';
import { ArrowUpDown, ArrowUp, ArrowDown, RotateCcw, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
interface LandSupplyTableProps {
  data: LandSupply[];
}
export function LandSupplyTable({ data }: LandSupplyTableProps) {
  const { processedData, filters, sort, setFilter, toggleSort, clearAll } = useDataTable(data);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const handleDownload = () => {
    toast.success("Preparing land report...", { description: "Exporting development plots." });
  };
  const hasActiveFilters = Object.values(filters).some(v => v !== '') || sort.direction !== null;
  const SortIcon = ({ columnKey }: { columnKey: string }) => {
    if (sort.key !== columnKey) return <ArrowUpDown className="ml-2 h-4 w-4 opacity-20" />;
    return sort.direction === 'asc' 
      ? <ArrowUp className="ml-2 h-4 w-4 text-primary animate-in fade-in zoom-in duration-300" /> 
      : <ArrowDown className="ml-2 h-4 w-4 text-primary animate-in fade-in zoom-in duration-300" />;
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Land Supply Data</h2>
          <p className="text-sm text-muted-foreground">Strategic developments and upcoming plots</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest bg-secondary px-2 py-1 rounded">
            {processedData.length} Records
          </p>
          {hasActiveFilters && (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleDownload} className="h-8 text-xs gap-1.5">
                <Download className="h-3.5 w-3.5" /> Export
              </Button>
            <Button variant="outline" size="sm" onClick={clearAll} className="h-8 text-xs border-dashed hover:border-destructive hover:text-destructive transition-all">
              <RotateCcw className="h-3.5 w-3.5 mr-1.5" /> Reset
            </Button>
            </div>
          )}
          {!hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={handleDownload} className="h-8 text-xs gap-1.5">
              <Download className="h-3.5 w-3.5" /> Export
            </Button>
          )}
        </div>
      </div>
      <Card className="border-muted shadow-soft overflow-hidden">
        <div className="overflow-auto max-h-[calc(100vh-320px)] relative">
          <div className="min-w-[1000px]">
            <Table>
              <TableHeader className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm">
                <TableRow className="bg-muted/30 hover:bg-muted/30 border-b">
                  {[
                    { key: 'address', label: 'Address', width: 'w-[300px]' },
                    { key: 'usage', label: 'Usage', width: 'w-[150px]' },
                    { key: 'projectName', label: 'Project Name', width: 'w-[250px]' },
                    { key: 'area', label: 'Area', width: 'w-[150px]' },
                    { key: 'year', label: 'Year', width: 'w-[100px]' },
                  ].map((col) => (
                    <TableHead key={col.key} className={cn("whitespace-nowrap h-11", col.width)}>
                      <button
                        onClick={() => toggleSort(col.key)}
                        className="inline-flex items-center hover:text-foreground transition-colors py-2 font-bold text-xs uppercase tracking-widest"
                      >
                        {col.label} <SortIcon columnKey={col.key} />
                      </button>
                    </TableHead>
                  ))}
                  <TableHead className="w-12" />
                </TableRow>
                <TableRow className="bg-background/80 hover:bg-background/80 border-b sticky top-[44px] z-20 shadow-sm">
                  <TableCell className="p-2"><Input placeholder="Filter address..." className="h-8 text-xs bg-secondary/50 border-none focus-visible:ring-1" value={filters.address || ''} onChange={(e) => setFilter('address', e.target.value)} /></TableCell>
                  <TableCell className="p-2"><Input placeholder="Usage..." className="h-8 text-xs bg-secondary/50 border-none focus-visible:ring-1" value={filters.usage || ''} onChange={(e) => setFilter('usage', e.target.value)} /></TableCell>
                  <TableCell className="p-2"><Input placeholder="Search projects..." className="h-8 text-xs bg-secondary/50 border-none focus-visible:ring-1" value={filters.projectName || ''} onChange={(e) => setFilter('projectName', e.target.value)} /></TableCell>
                  <TableCell className="p-2"><Input placeholder="Area..." className="h-8 text-xs bg-secondary/50 border-none focus-visible:ring-1" value={filters.area || ''} onChange={(e) => setFilter('area', e.target.value)} /></TableCell>
                  <TableCell className="p-2"><Input placeholder="Year..." className="h-8 text-xs bg-secondary/50 border-none focus-visible:ring-1" value={filters.year || ''} onChange={(e) => setFilter('year', e.target.value)} /></TableCell>
                  <TableCell className="p-2" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {processedData.length > 0 ? (
                  processedData.map((land) => (
                    <TableRow key={land.id} className="hover:bg-accent/40 transition-all duration-200">
                      <TableCell>
                        <button
                          onClick={() => setSelectedAddress(land.address)}
                          className="text-primary font-semibold hover:underline decoration-primary/30 underline-offset-4 text-left"
                        >
                          {land.address}
                        </button>
                      </TableCell>
                      <TableCell className="text-sm font-medium">
                        <span className="px-2 py-0.5 bg-secondary rounded-full">{land.usage}</span>
                      </TableCell>
                      <TableCell className="text-sm font-semibold text-foreground/80">{land.projectName}</TableCell>
                      <TableCell className="text-sm font-mono">{land.area}</TableCell>
                      <TableCell className="text-sm font-bold text-muted-foreground">{land.year}</TableCell>
                      <TableCell />
                    </TableRow>
                  ))
                ) : (
                  <TableRow><TableCell colSpan={6} className="h-48 text-center text-muted-foreground font-medium">No records found.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>
      <MapModal address={selectedAddress || ''} isOpen={!!selectedAddress} onClose={() => setSelectedAddress(null)} />
    </div>
  );
}