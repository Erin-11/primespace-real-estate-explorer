import React, { useState } from 'react';
import { LandSupply } from '@shared/mock-data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapModal } from '@/components/MapModal';
import { useDataTable } from '@/hooks/use-data-table';
import { ArrowUpDown, ArrowUp, ArrowDown, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
interface LandSupplyTableProps {
  data: LandSupply[];
}
export function LandSupplyTable({ data }: LandSupplyTableProps) {
  const { processedData, filters, sort, setFilter, toggleSort, clearAll } = useDataTable(data);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const SortIcon = ({ columnKey }: { columnKey: string }) => {
    if (sort.key !== columnKey) return <ArrowUpDown className="ml-2 h-4 w-4 opacity-30" />;
    return sort.direction === 'asc' ? <ArrowUp className="ml-2 h-4 w-4 text-primary" /> : <ArrowDown className="ml-2 h-4 w-4 text-primary" />;
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Land Supply Data</h2>
        <p className="text-sm text-muted-foreground">{processedData.length} records</p>
      </div>
      <Card className="border-muted overflow-hidden">
        <div className="overflow-x-auto max-h-[600px]">
          <Table>
            <TableHeader className="sticky top-0 z-20 bg-background">
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                {[
                  { key: 'address', label: 'Address' },
                  { key: 'usage', label: 'Usage' },
                  { key: 'projectName', label: 'Project Name' },
                  { key: 'area', label: 'Area' },
                  { key: 'year', label: 'Planned Year' },
                ].map((col) => (
                  <TableHead key={col.key} className="whitespace-nowrap">
                    <button 
                      onClick={() => toggleSort(col.key)} 
                      className="inline-flex items-center hover:text-foreground transition-colors py-2"
                    >
                      {col.label} <SortIcon columnKey={col.key} />
                    </button>
                  </TableHead>
                ))}
                <TableHead className="w-12" />
              </TableRow>
              <TableRow className="bg-background hover:bg-background border-b sticky top-[44px] z-10 shadow-sm">
                <TableCell className="p-2"><Input placeholder="Address..." className="h-8 text-xs bg-secondary" value={filters.address || ''} onChange={(e) => setFilter('address', e.target.value)} /></TableCell>
                <TableCell className="p-2"><Input placeholder="Usage..." className="h-8 text-xs bg-secondary" value={filters.usage || ''} onChange={(e) => setFilter('usage', e.target.value)} /></TableCell>
                <TableCell className="p-2"><Input placeholder="Project..." className="h-8 text-xs bg-secondary" value={filters.projectName || ''} onChange={(e) => setFilter('projectName', e.target.value)} /></TableCell>
                <TableCell className="p-2"><Input placeholder="Area..." className="h-8 text-xs bg-secondary" value={filters.area || ''} onChange={(e) => setFilter('area', e.target.value)} /></TableCell>
                <TableCell className="p-2"><Input placeholder="Year..." className="h-8 text-xs bg-secondary" value={filters.year || ''} onChange={(e) => setFilter('year', e.target.value)} /></TableCell>
                <TableCell className="p-2 text-center">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={clearAll}><RotateCcw className="h-4 w-4" /></Button>
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processedData.length > 0 ? (
                processedData.map((land) => (
                  <TableRow key={land.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell><button onClick={() => setSelectedAddress(land.address)} className="text-primary hover:underline font-medium text-left">{land.address}</button></TableCell>
                    <TableCell className="text-sm">{land.usage}</TableCell>
                    <TableCell className="text-sm">{land.projectName}</TableCell>
                    <TableCell className="text-sm">{land.area}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{land.year}</TableCell>
                    <TableCell />
                  </TableRow>
                ))
              ) : (
                <TableRow><TableCell colSpan={6} className="h-24 text-center text-muted-foreground">No records matching criteria.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
      <MapModal address={selectedAddress || ''} isOpen={!!selectedAddress} onClose={() => setSelectedAddress(null)} />
    </div>
  );
}