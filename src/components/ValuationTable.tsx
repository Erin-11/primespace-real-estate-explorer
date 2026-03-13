import React, { useState } from 'react';
import { Valuation } from '@shared/mock-data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapModal } from '@/components/MapModal';
import { useDataTable } from '@/hooks/use-data-table';
import { ArrowUpDown, ArrowUp, ArrowDown, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
interface ValuationTableProps {
  data: Valuation[];
}
export function ValuationTable({ data }: ValuationTableProps) {
  const { processedData, filters, sort, setFilter, toggleSort, clearAll } = useDataTable(data);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
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
          <h2 className="text-lg font-semibold tracking-tight">Property Valuations</h2>
          <p className="text-sm text-muted-foreground">Historical appraisal records</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest bg-secondary px-2 py-1 rounded">
            {processedData.length} Records
          </p>
          <Button variant="outline" size="sm" onClick={clearAll} className="h-8 text-xs border-dashed hover:border-destructive hover:text-destructive transition-all">
            <RotateCcw className="h-3.5 w-3.5 mr-1.5" /> Reset
          </Button>
        </div>
      </div>
      <Card className="border-muted shadow-soft overflow-hidden">
        <div className="overflow-auto max-h-[calc(100vh-320px)] relative">
          <div className="min-w-[1000px]">
            <Table>
              <TableHeader className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm">
                <TableRow className="bg-muted/30 hover:bg-muted/30 border-b">
                  {[
                    { key: 'address', label: 'Address' },
                    { key: 'date', label: 'Date' },
                    { key: 'propertyType', label: 'Property Type' },
                    { key: 'area', label: 'Area' },
                    { key: 'valuationType', label: 'Valuation Type' },
                    { key: 'valuer', label: 'Valuer' },
                  ].map((col) => (
                    <TableHead key={col.key} className="whitespace-nowrap h-11">
                      <button
                        onClick={() => toggleSort(col.key)}
                        className="inline-flex items-center hover:text-foreground transition-colors py-2 font-semibold text-xs uppercase tracking-widest"
                      >
                        {col.label} <SortIcon columnKey={col.key} />
                      </button>
                    </TableHead>
                  ))}
                  <TableHead className="w-12" />
                </TableRow>
                <TableRow className="bg-background/80 hover:bg-background/80 border-b sticky top-[44px] z-20 shadow-sm">
                  <TableCell className="p-2"><Input placeholder="Address..." className="h-8 text-xs bg-secondary/50 border-none focus-visible:ring-1" value={filters.address || ''} onChange={(e) => setFilter('address', e.target.value)} /></TableCell>
                  <TableCell className="p-2"><Input placeholder="Date..." className="h-8 text-xs bg-secondary/50 border-none focus-visible:ring-1" value={filters.date || ''} onChange={(e) => setFilter('date', e.target.value)} /></TableCell>
                  <TableCell className="p-2"><Input placeholder="Type..." className="h-8 text-xs bg-secondary/50 border-none focus-visible:ring-1" value={filters.propertyType || ''} onChange={(e) => setFilter('propertyType', e.target.value)} /></TableCell>
                  <TableCell className="p-2"><Input placeholder="Area..." className="h-8 text-xs bg-secondary/50 border-none focus-visible:ring-1" value={filters.area || ''} onChange={(e) => setFilter('area', e.target.value)} /></TableCell>
                  <TableCell className="p-2"><Input placeholder="Valuation..." className="h-8 text-xs bg-secondary/50 border-none focus-visible:ring-1" value={filters.valuationType || ''} onChange={(e) => setFilter('valuationType', e.target.value)} /></TableCell>
                  <TableCell className="p-2"><Input placeholder="Valuer..." className="h-8 text-xs bg-secondary/50 border-none focus-visible:ring-1" value={filters.valuer || ''} onChange={(e) => setFilter('valuer', e.target.value)} /></TableCell>
                  <TableCell className="p-2" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {processedData.length > 0 ? (
                  processedData.map((val) => (
                    <TableRow key={val.id} className="hover:bg-accent/50 transition-colors">
                      <TableCell>
                        <button 
                          onClick={() => setSelectedAddress(val.address)} 
                          className="text-primary font-semibold hover:underline decoration-primary/30 underline-offset-4 text-left"
                        >
                          {val.address}
                        </button>
                      </TableCell>
                      <TableCell className="text-sm">{val.date}</TableCell>
                      <TableCell className="text-sm font-medium">
                        <span className="px-2 py-0.5 bg-secondary rounded-full">{val.propertyType}</span>
                      </TableCell>
                      <TableCell className="text-sm font-mono">{val.area}</TableCell>
                      <TableCell className="text-sm">{val.valuationType}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{val.valuer}</TableCell>
                      <TableCell />
                    </TableRow>
                  ))
                ) : (
                  <TableRow><TableCell colSpan={7} className="h-48 text-center text-muted-foreground font-medium">No valuation records match criteria.</TableCell></TableRow>
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