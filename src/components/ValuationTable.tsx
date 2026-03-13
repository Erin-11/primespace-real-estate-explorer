import React, { useState } from 'react';
import { Valuation } from '@shared/mock-data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapModal } from '@/components/MapModal';
import { useDataTable } from '@/hooks/use-data-table';
import { ArrowUpDown, ArrowUp, ArrowDown, RotateCcw } from 'lucide-react';
interface ValuationTableProps {
  data: Valuation[];
}
export function ValuationTable({ data }: ValuationTableProps) {
  const { processedData, filters, sort, setFilter, toggleSort, clearAll } = useDataTable(data);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const SortIcon = ({ columnKey }: { columnKey: string }) => {
    if (sort.key !== columnKey) return <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />;
    return sort.direction === 'asc' ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />;
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Property Valuations</h2>
        <p className="text-sm text-muted-foreground">{processedData.length} records</p>
      </div>
      <Card className="border-muted overflow-hidden">
        <div className="overflow-x-auto max-h-[600px]">
          <Table>
            <TableHeader className="sticky top-0 z-20 bg-background">
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                {[
                  { key: 'address', label: 'Address' },
                  { key: 'date', label: 'Date' },
                  { key: 'propertyType', label: 'Property Type' },
                  { key: 'area', label: 'Area' },
                  { key: 'valuationType', label: 'Valuation Type' },
                  { key: 'valuer', label: 'Valuer' },
                ].map((col) => (
                  <TableHead key={col.key}>
                    <button onClick={() => toggleSort(col.key)} className="inline-flex items-center hover:text-foreground">
                      {col.label} <SortIcon columnKey={col.key} />
                    </button>
                  </TableHead>
                ))}
                <TableHead className="w-12" />
              </TableRow>
              <TableRow className="bg-background hover:bg-background border-b sticky top-[45px] z-10 shadow-sm">
                <TableCell className="p-2"><Input placeholder="Address..." className="h-8 text-xs" value={filters.address || ''} onChange={(e) => setFilter('address', e.target.value)} /></TableCell>
                <TableCell className="p-2"><Input placeholder="Date..." className="h-8 text-xs" value={filters.date || ''} onChange={(e) => setFilter('date', e.target.value)} /></TableCell>
                <TableCell className="p-2"><Input placeholder="Type..." className="h-8 text-xs" value={filters.propertyType || ''} onChange={(e) => setFilter('propertyType', e.target.value)} /></TableCell>
                <TableCell className="p-2"><Input placeholder="Area..." className="h-8 text-xs" value={filters.area || ''} onChange={(e) => setFilter('area', e.target.value)} /></TableCell>
                <TableCell className="p-2"><Input placeholder="Valuation..." className="h-8 text-xs" value={filters.valuationType || ''} onChange={(e) => setFilter('valuationType', e.target.value)} /></TableCell>
                <TableCell className="p-2"><Input placeholder="Valuer..." className="h-8 text-xs" value={filters.valuer || ''} onChange={(e) => setFilter('valuer', e.target.value)} /></TableCell>
                <TableCell className="p-2 text-center">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={clearAll}><RotateCcw className="h-4 w-4" /></Button>
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processedData.length > 0 ? (
                processedData.map((val) => (
                  <TableRow key={val.id} className="hover:bg-muted/30">
                    <TableCell><button onClick={() => setSelectedAddress(val.address)} className="text-primary hover:underline font-medium">{val.address}</button></TableCell>
                    <TableCell className="text-sm">{val.date}</TableCell>
                    <TableCell className="text-sm">{val.propertyType}</TableCell>
                    <TableCell className="text-sm">{val.area}</TableCell>
                    <TableCell className="text-sm">{val.valuationType}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{val.valuer}</TableCell>
                    <TableCell />
                  </TableRow>
                ))
              ) : (
                <TableRow><TableCell colSpan={7} className="h-24 text-center text-muted-foreground">No valuation records match criteria.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
      <MapModal address={selectedAddress || ''} isOpen={!!selectedAddress} onClose={() => setSelectedAddress(null)} />
    </div>
  );
}