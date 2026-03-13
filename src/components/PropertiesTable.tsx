import React, { useState, useMemo } from 'react';
import { Property } from '@shared/mock-data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapModal } from '@/components/MapModal';
import { Card } from '@/components/ui/card';
interface PropertiesTableProps {
  data: Property[];
}
export function PropertiesTable({ data }: PropertiesTableProps) {
  const [filterType, setFilterType] = useState<string>('All');
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const filteredData = useMemo(() => {
    if (filterType === 'All') return data;
    return data.filter((item) => item.type === filterType);
  }, [data, filterType]);
  const propertyTypes = ['All', 'Commercial', 'Residential', 'Retail', 'Hotel', 'Industrial', 'Other'];
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Property Listings</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Filter by Type:</span>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {propertyTypes.map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Card className="border-muted overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Building</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Floor/Unit</TableHead>
              <TableHead>Area</TableHead>
              <TableHead>Tenant</TableHead>
              <TableHead>Landlord</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((property) => (
                <TableRow key={property.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell>
                    <button
                      onClick={() => setSelectedAddress(property.building)}
                      className="text-primary hover:underline text-left font-medium"
                    >
                      {property.building}
                    </button>
                  </TableCell>
                  <TableCell className="text-sm">{property.type}</TableCell>
                  <TableCell className="text-sm">{property.floorUnit}</TableCell>
                  <TableCell className="text-sm">{property.area}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{property.tenant}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{property.landlord}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  No properties found for this department.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
      <MapModal
        address={selectedAddress || ''}
        isOpen={!!selectedAddress}
        onClose={() => setSelectedAddress(null)}
      />
    </div>
  );
}