import React, { useState } from 'react';
import { Valuation } from '@shared/mock-data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapModal } from '@/components/MapModal';
import { useDataTable } from '@/hooks/use-data-table';
import { ArrowUpDown, ArrowUp, ArrowDown, MapPin, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
interface ValuationTableProps {
  data: Valuation[];
}
export function ValuationTable({ data }: ValuationTableProps) {
  const { processedData, filters, sort, setFilter, toggleSort, clearAll } = useDataTable(data, 'date');
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
        <h2 className="text-xl font-bold tracking-tight">Valuation Register</h2>
        <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">
          {processedData.length} records processed
        </div>
      </div>
      <Card className="border-border shadow-soft overflow-hidden">
        <div className="overflow-auto max-h-[calc(100vh-320px)] relative">
          <Table className="min-w-[1100px]">
            <TableHeader className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b">
              <TableRow className="hover:bg-transparent">
                {[
                  { key: 'address', label: 'Subject Property', width: 'w-[320px]' },
                  { key: 'date', label: 'Effective Date', width: 'w-[140px]' },
                  { key: 'propertyType', label: 'Asset Type', width: 'w-[140px]' },
                  { key: 'area', label: 'Area', width: 'w-[120px]' },
                  { key: 'valuer', label: 'Valuer', width: 'w-[180px]' },
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
                <TableCell className="p-2"><Input placeholder="Search address..." className="h-8 text-xs bg-secondary/40" value={filters.address || ''} onChange={(e) => setFilter('address', e.target.value)} /></TableCell>
                <TableCell className="p-2"><Input placeholder="Date..." className="h-8 text-xs bg-secondary/40" value={filters.date || ''} onChange={(e) => setFilter('date', e.target.value)} /></TableCell>
                <TableCell className="p-2"><Input placeholder="Type..." className="h-8 text-xs bg-secondary/40" value={filters.propertyType || ''} onChange={(e) => setFilter('propertyType', e.target.value)} /></TableCell>
                <TableCell className="p-2"><Input className="h-8 text-xs bg-secondary/40" value={filters.area || ''} onChange={(e) => setFilter('area', e.target.value)} /></TableCell>
                <TableCell className="p-2"><Input placeholder="Firm..." className="h-8 text-xs bg-secondary/40" value={filters.valuer || ''} onChange={(e) => setFilter('valuer', e.target.value)} /></TableCell>
                <TableCell className="p-2" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {processedData.length > 0 ? (
                processedData.map((val) => (
                  <TableRow key={val.id} className="group hover:bg-accent/40 transition-colors">
                    <TableCell className="px-4 py-3 font-bold text-sm tracking-tight">{val.address}</TableCell>
                    <TableCell className="px-4 py-3 text-sm font-medium">{val.date}</TableCell>
                    <TableCell className="px-4 py-3">
                      <span className="px-2 py-0.5 bg-orange-500/5 text-orange-600 text-[10px] font-black uppercase rounded-full border border-orange-500/10">
                        {val.propertyType}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm font-mono">{val.area}</TableCell>
                    <TableCell className="px-4 py-3 text-sm font-bold text-muted-foreground/80">{val.valuer}</TableCell>
                    <TableCell className="px-4 py-3">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-primary" onClick={() => setSelectedAddress(val.address)}>
                          <MapPin className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <Search className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow><TableCell colSpan={6} className="h-48 text-center text-muted-foreground font-medium">No valuation data matches criteria.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
      <MapModal address={selectedAddress || ''} isOpen={!!selectedAddress} onClose={() => setSelectedAddress(null)} />
    </div>
  );
}