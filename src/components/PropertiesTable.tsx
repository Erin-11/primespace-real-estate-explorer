import React, { useState } from 'react';
import { Property } from '@shared/mock-data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapModal } from '@/components/MapModal';
import { useDataTable } from '@/hooks/use-data-table';
import { ArrowUpDown, ArrowUp, ArrowDown, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
const PROPERTY_TYPES = ['All', 'Commercial', 'Residential', 'Retail', 'Hotel', 'Industrial', 'Other'];
interface PropertiesTableProps {
  data: Property[];
}
export function PropertiesTable({ data }: PropertiesTableProps) {
  const { processedData, filters, sort, setFilter, toggleSort, clearAll } = useDataTable(data);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
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
          <h2 className="text-lg font-semibold tracking-tight">Property Listings</h2>
          <p className="text-sm text-muted-foreground">Detailed inventory for current department</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider bg-secondary px-2 py-1 rounded">
            {processedData.length} Records
          </p>
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearAll}
              className="h-8 text-xs gap-1.5 border-dashed hover:border-destructive hover:text-destructive transition-all"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </Button>
          )}
        </div>
      </div>
      <Card className="border-muted shadow-soft overflow-hidden">
        <div className="overflow-auto max-h-[calc(100vh-320px)] relative">
          <div className="min-w-[1200px]">
            <Table>
              <TableHeader className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm">
                <TableRow className="bg-muted/30 hover:bg-muted/30 border-b">
                  {[
                    { key: 'building', label: 'Building', width: 'w-[200px]' },
                    { key: 'type', label: 'Type', width: 'w-[120px]' },
                    { key: 'floorUnit', label: 'Floor/Unit', width: 'w-[100px]' },
                    { key: 'area', label: 'Area', width: 'w-[100px]' },
                    { key: 'tenant', label: 'Tenant', width: 'w-[150px]' },
                    { key: 'landlord', label: 'Landlord', width: 'w-[150px]' },
                    { key: 'agent', label: 'Agent', width: 'w-[120px]' },
                    { key: 'company', label: 'Company', width: 'w-[120px]' },
                    { key: 'contacts', label: 'Contacts', width: 'w-[200px]' },
                  ].map((col) => (
                    <TableHead key={col.key} className={cn("whitespace-nowrap h-11", col.width)}>
                      <button
                        onClick={() => toggleSort(col.key)}
                        className="inline-flex items-center hover:text-foreground transition-colors py-2 font-semibold text-xs uppercase tracking-wider"
                      >
                        {col.label}
                        <SortIcon columnKey={col.key} />
                      </button>
                    </TableHead>
                  ))}
                  <TableHead className="w-12"></TableHead>
                </TableRow>
                <TableRow className="bg-background/80 hover:bg-background/80 border-b shadow-sm sticky top-[44px] z-20">
                  <TableCell className="p-2">
                    <Input
                      placeholder="Filter building..."
                      className="h-8 text-xs bg-secondary/50 border-none focus-visible:ring-1"
                      value={filters.building || ''}
                      onChange={(e) => setFilter('building', e.target.value)}
                    />
                  </TableCell>
                  <TableCell className="p-2">
                    <Select value={filters.type || 'All'} onValueChange={(v) => setFilter('type', v)}>
                      <SelectTrigger className="h-8 text-xs bg-secondary/50 border-none focus-visible:ring-1">
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        {PROPERTY_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="p-2"><Input placeholder="Unit..." className="h-8 text-xs bg-secondary/50 border-none" value={filters.floorUnit || ''} onChange={(e) => setFilter('floorUnit', e.target.value)} /></TableCell>
                  <TableCell className="p-2"><Input placeholder="Size..." className="h-8 text-xs bg-secondary/50 border-none" value={filters.area || ''} onChange={(e) => setFilter('area', e.target.value)} /></TableCell>
                  <TableCell className="p-2"><Input placeholder="Search tenant..." className="h-8 text-xs bg-secondary/50 border-none" value={filters.tenant || ''} onChange={(e) => setFilter('tenant', e.target.value)} /></TableCell>
                  <TableCell className="p-2"><Input placeholder="Landlord..." className="h-8 text-xs bg-secondary/50 border-none" value={filters.landlord || ''} onChange={(e) => setFilter('landlord', e.target.value)} /></TableCell>
                  <TableCell className="p-2"><Input placeholder="Agent..." className="h-8 text-xs bg-secondary/50 border-none" value={filters.agent || ''} onChange={(e) => setFilter('agent', e.target.value)} /></TableCell>
                  <TableCell className="p-2"><Input placeholder="Company..." className="h-8 text-xs bg-secondary/50 border-none" value={filters.company || ''} onChange={(e) => setFilter('company', e.target.value)} /></TableCell>
                  <TableCell className="p-2"><Input placeholder="Phone/Email..." className="h-8 text-xs bg-secondary/50 border-none" value={filters.contacts || ''} onChange={(e) => setFilter('contacts', e.target.value)} /></TableCell>
                  <TableCell className="p-2" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {processedData.length > 0 ? (
                  processedData.map((property) => (
                    <TableRow key={property.id} className="hover:bg-accent/50 transition-colors group">
                      <TableCell className="font-semibold whitespace-nowrap">
                        <button
                          onClick={() => setSelectedAddress(property.building)}
                          className="text-primary hover:text-primary/70 underline underline-offset-4 decoration-primary/20 hover:decoration-primary transition-all text-left"
                        >
                          {property.building}
                        </button>
                      </TableCell>
                      <TableCell className="text-xs font-medium">
                        <span className="px-2 py-0.5 bg-secondary rounded-full text-secondary-foreground">
                          {property.type}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm">{property.floorUnit}</TableCell>
                      <TableCell className="text-sm font-mono">{property.area}</TableCell>
                      <TableCell className="text-sm truncate max-w-[150px]" title={property.tenant}>{property.tenant}</TableCell>
                      <TableCell className="text-sm truncate max-w-[150px]" title={property.landlord}>{property.landlord}</TableCell>
                      <TableCell className="text-sm">{property.agent}</TableCell>
                      <TableCell className="text-sm">{property.company}</TableCell>
                      <TableCell className="text-xs text-muted-foreground leading-relaxed">
                        {property.contacts}
                      </TableCell>
                      <TableCell />
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} className="h-64 text-center">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <p className="text-muted-foreground font-medium">No results found</p>
                        <Button variant="link" onClick={clearAll} className="text-xs">Clear all filters and try again</Button>
                      </div>
                    </TableCell>
                  </TableRow>
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