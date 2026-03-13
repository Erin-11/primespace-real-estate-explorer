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
interface PropertiesTableProps {
  data: Property[];
}
export function PropertiesTable({ data }: PropertiesTableProps) {
  const { processedData, filters, sort, setFilter, toggleSort, clearAll } = useDataTable(data);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const SortIcon = ({ columnKey }: { columnKey: string }) => {
    if (sort.key !== columnKey) return <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />;
    return sort.direction === 'asc' ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />;
  };
  const propertyTypes = ['All', 'Commercial', 'Residential', 'Retail', 'Hotel', 'Industrial', 'Other'];
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Property Listings</h2>
        <p className="text-sm text-muted-foreground">{processedData.length} records found</p>
      </div>
      <Card className="border-muted overflow-hidden relative">
        <div className="overflow-x-auto max-h-[600px]">
          <Table>
            <TableHeader className="sticky top-0 z-20 bg-background">
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                {[
                  { key: 'building', label: 'Building' },
                  { key: 'type', label: 'Type' },
                  { key: 'floorUnit', label: 'Floor/Unit' },
                  { key: 'area', label: 'Area' },
                  { key: 'tenant', label: 'Tenant' },
                  { key: 'landlord', label: 'Landlord' },
                  { key: 'agent', label: 'Handling Agent' },
                  { key: 'company', label: 'Company' },
                  { key: 'contacts', label: 'Contacts' },
                ].map((col) => (
                  <TableHead key={col.key} className="whitespace-nowrap">
                    <button
                      onClick={() => toggleSort(col.key)}
                      className="inline-flex items-center hover:text-foreground transition-colors"
                    >
                      {col.label}
                      <SortIcon columnKey={col.key} />
                    </button>
                  </TableHead>
                ))}
                <TableHead className="w-12"></TableHead>
              </TableRow>
              {/* Filter Row */}
              <TableRow className="bg-background hover:bg-background border-b shadow-sm z-10 sticky top-[45px]">
                <TableCell className="p-2"><Input placeholder="Search..." className="h-8 text-xs" value={filters.building || ''} onChange={(e) => setFilter('building', e.target.value)} /></TableCell>
                <TableCell className="p-2">
                  <Select value={filters.type || 'All'} onValueChange={(v) => setFilter('type', v)}>
                    <SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Type" /></SelectTrigger>
                    <SelectContent>
                      {propertyTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="p-2"><Input placeholder="Floor..." className="h-8 text-xs" value={filters.floorUnit || ''} onChange={(e) => setFilter('floorUnit', e.target.value)} /></TableCell>
                <TableCell className="p-2"><Input placeholder="Area..." className="h-8 text-xs" value={filters.area || ''} onChange={(e) => setFilter('area', e.target.value)} /></TableCell>
                <TableCell className="p-2"><Input placeholder="Tenant..." className="h-8 text-xs" value={filters.tenant || ''} onChange={(e) => setFilter('tenant', e.target.value)} /></TableCell>
                <TableCell className="p-2"><Input placeholder="Landlord..." className="h-8 text-xs" value={filters.landlord || ''} onChange={(e) => setFilter('landlord', e.target.value)} /></TableCell>
                <TableCell className="p-2"><Input placeholder="Agent..." className="h-8 text-xs" value={filters.agent || ''} onChange={(e) => setFilter('agent', e.target.value)} /></TableCell>
                <TableCell className="p-2"><Input placeholder="Company..." className="h-8 text-xs" value={filters.company || ''} onChange={(e) => setFilter('company', e.target.value)} /></TableCell>
                <TableCell className="p-2"><Input placeholder="Contact..." className="h-8 text-xs" value={filters.contacts || ''} onChange={(e) => setFilter('contacts', e.target.value)} /></TableCell>
                <TableCell className="p-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={clearAll} title="Clear all filters">
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processedData.length > 0 ? (
                processedData.map((property) => (
                  <TableRow key={property.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-medium whitespace-nowrap">
                      <button onClick={() => setSelectedAddress(property.building)} className="text-primary hover:underline text-left">
                        {property.building}
                      </button>
                    </TableCell>
                    <TableCell className="text-sm">{property.type}</TableCell>
                    <TableCell className="text-sm">{property.floorUnit}</TableCell>
                    <TableCell className="text-sm">{property.area}</TableCell>
                    <TableCell className="text-sm">{property.tenant}</TableCell>
                    <TableCell className="text-sm">{property.landlord}</TableCell>
                    <TableCell className="text-sm">{property.agent}</TableCell>
                    <TableCell className="text-sm">{property.company}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{property.contacts}</TableCell>
                    <TableCell />
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={10} className="h-32 text-center text-muted-foreground">
                    No results found matching your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
      <MapModal address={selectedAddress || ''} isOpen={!!selectedAddress} onClose={() => setSelectedAddress(null)} />
    </div>
  );
}