import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Property } from '@shared/mock-data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapModal } from '@/components/MapModal';
import { toast } from 'sonner';
import { useDataTable } from '@/hooks/use-data-table';
import { useWatchlist } from '@/hooks/use-watchlist';
import { ArrowUpDown, ArrowUp, ArrowDown, RotateCcw, Download, MapPin, Copy, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
const PROPERTY_TYPES = ['All', 'Commercial', 'Residential', 'Retail', 'Hotel', 'Industrial', 'Other'];
interface PropertiesTableProps {
  data: Property[];
}
export function PropertiesTable({ data }: PropertiesTableProps) {
  const { id: departmentId } = useParams<{ id: string }>();
  const { processedData, filters, sort, setFilter, toggleSort, clearAll } = useDataTable(data, 'building');
  const { isBookmarked, toggleWatchlist } = useWatchlist();
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const handleDownload = () => {
    toast.success("Report generated", {
      description: `Exported ${processedData.length} records to spreadsheet format.`,
    });
  };
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard", { description: text });
  };
  const SortIcon = ({ columnKey }: { columnKey: string }) => {
    if (sort.key !== columnKey) return <ArrowUpDown className="ml-2 h-3 w-3 opacity-20" />;
    return sort.direction === 'asc'
      ? <ArrowUp className="ml-2 h-3 w-3 text-primary" />
      : <ArrowDown className="ml-2 h-3 w-3 text-primary" />;
  };
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Property Inventory</h2>
          <p className="text-sm text-muted-foreground">Strategic assets and listing details</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleDownload} className="h-9 gap-2 font-bold uppercase text-[10px] tracking-widest">
            <Download className="h-3.5 w-3.5" /> Export
          </Button>
          <Button variant="ghost" size="sm" onClick={clearAll} className="h-9 gap-2 text-muted-foreground hover:text-foreground font-bold uppercase text-[10px] tracking-widest">
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </Button>
        </div>
      </div>
      <Card className="border-border shadow-soft overflow-hidden bg-card/50 backdrop-blur-md">
        <div className="overflow-auto max-h-[calc(100vh-400px)] relative">
          <Table className="min-w-[1500px]">
            <TableHeader className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b">
              <TableRow className="hover:bg-transparent">
                {[
                  { key: 'building', label: 'Building', width: 'w-[280px]' },
                  { key: 'type', label: 'Type', width: 'w-[140px]' },
                  { key: 'floorUnit', label: 'Unit', width: 'w-[100px]' },
                  { key: 'area', label: 'Area', width: 'w-[120px]' },
                  { key: 'tenant', label: 'Tenant', width: 'w-[180px]' },
                  { key: 'landlord', label: 'Landlord', width: 'w-[180px]' },
                  { key: 'agent', label: 'Agent', width: 'w-[140px]' },
                  { key: 'contacts', label: 'Contacts', width: 'w-[220px]' },
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
                <TableHead className="w-[160px] p-0">
                  <span className="flex items-center h-full px-4 font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Actions</span>
                </TableHead>
              </TableRow>
              <TableRow className="hover:bg-transparent bg-background/50 border-b sticky top-[48px] z-30 shadow-sm">
                <TableCell className="p-2"><Input placeholder="Building..." className="h-8 text-xs bg-secondary/40" value={filters.building || ''} onChange={(e) => setFilter('building', e.target.value)} /></TableCell>
                <TableCell className="p-2">
                  <Select value={filters.type || 'All'} onValueChange={(v) => setFilter('type', v)}>
                    <SelectTrigger className="h-8 text-xs bg-secondary/40"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {PROPERTY_TYPES.map(t => <SelectItem key={t} value={t} className="text-xs">{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="p-2"><Input className="h-8 text-xs bg-secondary/40" value={filters.floorUnit || ''} onChange={(e) => setFilter('floorUnit', e.target.value)} /></TableCell>
                <TableCell className="p-2"><Input className="h-8 text-xs bg-secondary/40" value={filters.area || ''} onChange={(e) => setFilter('area', e.target.value)} /></TableCell>
                <TableCell className="p-2"><Input placeholder="Tenant..." className="h-8 text-xs bg-secondary/40" value={filters.tenant || ''} onChange={(e) => setFilter('tenant', e.target.value)} /></TableCell>
                <TableCell className="p-2"><Input placeholder="Landlord..." className="h-8 text-xs bg-secondary/40" value={filters.landlord || ''} onChange={(e) => setFilter('landlord', e.target.value)} /></TableCell>
                <TableCell className="p-2"><Input className="h-8 text-xs bg-secondary/40" value={filters.agent || ''} onChange={(e) => setFilter('agent', e.target.value)} /></TableCell>
                <TableCell className="p-2"><Input className="h-8 text-xs bg-secondary/40" value={filters.contacts || ''} onChange={(e) => setFilter('contacts', e.target.value)} /></TableCell>
                <TableCell className="p-2" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {processedData.length > 0 ? (
                processedData.map((property) => {
                  const saved = isBookmarked(property.id);
                  return (
                    <TableRow key={property.id} className="group hover:bg-accent/30 border-b border-border/40 transition-colors">
                      <TableCell className="px-4 py-3 font-bold text-sm tracking-tight">{property.building}</TableCell>
                      <TableCell className="px-4 py-3">
                        <span className="px-2 py-0.5 bg-secondary text-[10px] font-black uppercase tracking-wider rounded-full border">
                          {property.type}
                        </span>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-sm font-medium">{property.floorUnit}</TableCell>
                      <TableCell className="px-4 py-3 text-sm font-mono tracking-tight text-muted-foreground">{property.area}</TableCell>
                      <TableCell className="px-4 py-3 text-sm truncate max-w-[180px]">{property.tenant}</TableCell>
                      <TableCell className="px-4 py-3 text-sm truncate max-w-[180px]">{property.landlord}</TableCell>
                      <TableCell className="px-4 py-3 text-sm font-medium">{property.agent}</TableCell>
                      <TableCell className="px-4 py-3 text-xs text-muted-foreground font-medium">{property.contacts}</TableCell>
                      <TableCell className="px-4 py-3">
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  size="icon" 
                                  variant="ghost" 
                                  className={cn("h-8 w-8 transition-all", saved ? "text-amber-500 fill-amber-500" : "text-muted-foreground hover:text-amber-500")}
                                  onClick={() => toggleWatchlist({ id: property.id, building: property.building, departmentId: departmentId || '', type: property.type })}
                                >
                                  <Star className={cn("h-4 w-4", saved && "fill-current")} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>{saved ? 'Remove Bookmark' : 'Bookmark Property'}</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-primary" onClick={() => setSelectedAddress(property.building)}>
                                  <MapPin className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>View Map</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => copyToClipboard(`${property.building}, ${property.floorUnit}`)}>
                                  <Copy className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Copy Info</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="h-64 text-center text-muted-foreground font-medium">No records found matching criteria.</TableCell>
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