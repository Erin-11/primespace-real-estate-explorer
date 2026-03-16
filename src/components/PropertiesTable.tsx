import React, { useState } from 'react';
import { Property } from '@shared/mock-data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapModal } from '@/components/MapModal';
import { toast } from 'sonner';
import { useDataTable } from '@/hooks/use-data-table';
import { ArrowUpDown, ArrowUp, ArrowDown, RotateCcw, Download, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
const PROPERTY_TYPES = ['All', 'Commercial', 'Residential', 'Retail', 'Hotel', 'Industrial', 'Other'];
interface PropertiesTableProps {
  data: Property[];
}
export function PropertiesTable({ data }: PropertiesTableProps) {
  const { processedData, filters, sort, setFilter, toggleSort, clearAll } = useDataTable(data);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const handleDownload = () => {
    toast.success("Generating report...", { 
      description: `Exporting ${processedData.length} property records to CSV.`,
      icon: <Download className="h-4 w-4" />
    });
  };
  const hasActiveFilters = Object.values(filters).some(v => v !== '') || sort.direction !== null;
  const SortIcon = ({ columnKey }: { columnKey: string }) => {
    if (sort.key !== columnKey) return <ArrowUpDown className="ml-2 h-4 w-4 opacity-20 group-hover/btn:opacity-50 transition-opacity" />;
    return sort.direction === 'asc'
      ? <ArrowUp className="ml-2 h-4 w-4 text-primary animate-in fade-in zoom-in duration-300" />
      : <ArrowDown className="ml-2 h-4 w-4 text-primary animate-in fade-in zoom-in duration-300" />;
  };
  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-1">
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight">Property Listings</h2>
          <p className="text-sm text-muted-foreground">Comprehensive asset inventory for the selected department</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center text-xs font-bold text-muted-foreground uppercase tracking-widest bg-secondary/80 px-3 py-1.5 rounded-full border border-border/50">
            {processedData.length} Records found
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="h-9 text-xs font-bold uppercase tracking-tight gap-1.5 px-4"
            >
              <Download className="h-4 w-4" />
              Export Data
            </Button>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAll}
                className="h-9 text-xs font-bold uppercase tracking-tight gap-1.5 text-muted-foreground hover:text-destructive transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
                Clear
              </Button>
            )}
          </div>
        </div>
      </div>
      <Card className="border-border shadow-soft overflow-hidden bg-card/50 backdrop-blur-sm">
        <div className="overflow-auto max-h-[calc(100vh-340px)] relative">
          <div className="min-w-[1400px]">
            <Table>
              <TableHeader className="sticky top-0 z-40 bg-background/95 backdrop-blur-md">
                <TableRow className="hover:bg-transparent border-b border-border/60">
                  {[
                    { key: 'building', label: 'Building', width: 'w-[250px]' },
                    { key: 'type', label: 'Type', width: 'w-[140px]' },
                    { key: 'floorUnit', label: 'Floor/Unit', width: 'w-[120px]' },
                    { key: 'area', label: 'Area', width: 'w-[120px]' },
                    { key: 'tenant', label: 'Tenant', width: 'w-[180px]' },
                    { key: 'landlord', label: 'Landlord', width: 'w-[180px]' },
                    { key: 'agent', label: 'Agent', width: 'w-[140px]' },
                    { key: 'company', label: 'Company', width: 'w-[140px]' },
                    { key: 'contacts', label: 'Contacts', width: 'w-[250px]' },
                  ].map((col) => (
                    <TableHead key={col.key} className={cn("p-0 h-12", col.width)}>
                      <button
                        onClick={() => toggleSort(col.key)}
                        className="group/btn flex items-center justify-start w-full h-full px-4 font-bold text-[10px] uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors outline-none focus-visible:bg-accent"
                        aria-label={`Sort by ${col.label}`}
                      >
                        {col.label}
                        <SortIcon columnKey={col.key} />
                      </button>
                    </TableHead>
                  ))}
                  <TableHead className="w-12 p-0" />
                </TableRow>
                <TableRow className="hover:bg-transparent bg-background/50 border-b border-border/40 shadow-[0_1px_2px_rgba(0,0,0,0.05)] sticky top-[48px] z-30">
                  <TableCell className="p-2">
                    <Input
                      placeholder="Search building..."
                      className="h-8 text-xs bg-secondary/40 border-border/50 focus-visible:ring-1 focus-visible:bg-background transition-all"
                      value={filters.building || ''}
                      onChange={(e) => setFilter('building', e.target.value)}
                      aria-label="Filter by building"
                    />
                  </TableCell>
                  <TableCell className="p-2">
                    <Select value={filters.type || 'All'} onValueChange={(v) => setFilter('type', v)}>
                      <SelectTrigger className="h-8 text-xs bg-secondary/40 border-border/50 focus-visible:ring-1 focus-visible:bg-background">
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        {PROPERTY_TYPES.map(t => <SelectItem key={t} value={t} className="text-xs">{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="p-2"><Input placeholder="..." className="h-8 text-xs bg-secondary/40 border-border/50" value={filters.floorUnit || ''} onChange={(e) => setFilter('floorUnit', e.target.value)} /></TableCell>
                  <TableCell className="p-2"><Input placeholder="..." className="h-8 text-xs bg-secondary/40 border-border/50" value={filters.area || ''} onChange={(e) => setFilter('area', e.target.value)} /></TableCell>
                  <TableCell className="p-2"><Input placeholder="Search tenant..." className="h-8 text-xs bg-secondary/40 border-border/50" value={filters.tenant || ''} onChange={(e) => setFilter('tenant', e.target.value)} /></TableCell>
                  <TableCell className="p-2"><Input placeholder="Search landlord..." className="h-8 text-xs bg-secondary/40 border-border/50" value={filters.landlord || ''} onChange={(e) => setFilter('landlord', e.target.value)} /></TableCell>
                  <TableCell className="p-2"><Input placeholder="..." className="h-8 text-xs bg-secondary/40 border-border/50" value={filters.agent || ''} onChange={(e) => setFilter('agent', e.target.value)} /></TableCell>
                  <TableCell className="p-2"><Input placeholder="..." className="h-8 text-xs bg-secondary/40 border-border/50" value={filters.company || ''} onChange={(e) => setFilter('company', e.target.value)} /></TableCell>
                  <TableCell className="p-2"><Input placeholder="Contact info..." className="h-8 text-xs bg-secondary/40 border-border/50" value={filters.contacts || ''} onChange={(e) => setFilter('contacts', e.target.value)} /></TableCell>
                  <TableCell className="p-2" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {processedData.length > 0 ? (
                  processedData.map((property) => (
                    <TableRow 
                      key={property.id} 
                      className="group transition-colors duration-150 hover:bg-accent/40 border-b border-border/20"
                    >
                      <TableCell className="px-4 py-3 align-middle">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                onClick={() => setSelectedAddress(property.building)}
                                className="text-left font-bold text-sm tracking-tight text-primary hover:text-primary/70 transition-colors inline-flex items-center gap-2"
                              >
                                {property.building}
                                <span className="p-1 rounded bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Info className="w-3 h-3" />
                                </span>
                              </button>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                              <p className="text-xs font-semibold">View on Map</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        <span className="px-2.5 py-1 bg-secondary text-secondary-foreground rounded-full text-[10px] font-black uppercase tracking-wider border border-border/30">
                          {property.type}
                        </span>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-sm font-medium">{property.floorUnit}</TableCell>
                      <TableCell className="px-4 py-3 text-sm font-mono tracking-tighter text-muted-foreground group-hover:text-foreground transition-colors">
                        {property.area}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-sm truncate max-w-[180px]" title={property.tenant}>
                        {property.tenant || <span className="text-muted-foreground/30">—</span>}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-sm truncate max-w-[180px]" title={property.landlord}>
                        {property.landlord || <span className="text-muted-foreground/30">—</span>}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-sm font-medium">{property.agent}</TableCell>
                      <TableCell className="px-4 py-3 text-sm">{property.company}</TableCell>
                      <TableCell className="px-4 py-3">
                         <p className="text-xs text-muted-foreground group-hover:text-foreground/80 leading-relaxed font-medium transition-colors">
                          {property.contacts}
                        </p>
                      </TableCell>
                      <TableCell className="px-4 py-3" />
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} className="h-[400px] text-center bg-muted/5">
                      <div className="flex flex-col items-center justify-center space-y-3 animate-in fade-in zoom-in duration-300">
                        <div className="p-4 rounded-full bg-secondary">
                          <RotateCcw className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-lg font-bold">No results found</p>
                          <p className="text-sm text-muted-foreground">Adjust your search parameters or reset all filters.</p>
                        </div>
                        <Button variant="outline" onClick={clearAll} className="mt-4 font-bold h-10 px-6 uppercase tracking-widest text-[10px]">
                          Reset Data View
                        </Button>
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