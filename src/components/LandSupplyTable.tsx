import React, { useState } from 'react';
import { LandSupply } from '@shared/mock-data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MapModal } from '@/components/MapModal';
import { Card } from '@/components/ui/card';
interface LandSupplyTableProps {
  data: LandSupply[];
}
export function LandSupplyTable({ data }: LandSupplyTableProps) {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Land Supply Data</h2>
      <Card className="border-muted overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Address</TableHead>
              <TableHead>Usage</TableHead>
              <TableHead>Project Name</TableHead>
              <TableHead>Area</TableHead>
              <TableHead>Planned Year</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((land) => (
                <TableRow key={land.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell>
                    <button
                      onClick={() => setSelectedAddress(land.address)}
                      className="text-primary hover:underline text-left font-medium"
                    >
                      {land.address}
                    </button>
                  </TableCell>
                  <TableCell className="text-sm">{land.usage}</TableCell>
                  <TableCell className="text-sm">{land.projectName}</TableCell>
                  <TableCell className="text-sm">{land.area}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{land.year}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  No land supply records found.
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