import React, { useState } from 'react';
import { Valuation } from '@shared/mock-data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MapModal } from '@/components/MapModal';
import { Card } from '@/components/ui/card';
interface ValuationTableProps {
  data: Valuation[];
}
export function ValuationTable({ data }: ValuationTableProps) {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Property Valuations</h2>
      <Card className="border-muted overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Address</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Property Type</TableHead>
              <TableHead>Area</TableHead>
              <TableHead>Valuation Type</TableHead>
              <TableHead>Valuer</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((val) => (
                <TableRow key={val.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell>
                    <button
                      onClick={() => setSelectedAddress(val.address)}
                      className="text-primary hover:underline text-left font-medium"
                    >
                      {val.address}
                    </button>
                  </TableCell>
                  <TableCell className="text-sm">{val.date}</TableCell>
                  <TableCell className="text-sm">{val.propertyType}</TableCell>
                  <TableCell className="text-sm">{val.area}</TableCell>
                  <TableCell className="text-sm">{val.valuationType}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{val.valuer}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  No valuation records found.
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