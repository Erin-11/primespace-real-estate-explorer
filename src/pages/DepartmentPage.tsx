import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { DEPARTMENTS, MOCK_PROPERTIES, MOCK_LAND_SUPPLY, MOCK_VALUATION } from '@shared/mock-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PropertiesTable } from '@/components/PropertiesTable';
import { LandSupplyTable } from '@/components/LandSupplyTable';
import { ValuationTable } from '@/components/ValuationTable';
import { ThemeToggle } from '@/components/ThemeToggle';
import { DataTableSkeleton } from '@/components/DataTableSkeleton';
export function DepartmentPage() {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const department = DEPARTMENTS.find((d) => d.id === id);
  useEffect(() => {
    // Simulate data loading for a polished feel
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, [id]);
  if (!department) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <h1 className="text-2xl font-bold">Department Not Found</h1>
        <Link to="/" className="text-primary hover:underline">Return to Home</Link>
      </div>
    );
  }
  // Hide Valuation for HK and Kowloon
  const showValuation = id !== 'hong-kong' && id !== 'kowloon';
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 hover:bg-secondary rounded-full transition-colors" aria-label="Go back">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-semibold tracking-tight truncate">{department.name} Explorer</h1>
          </div>
          <ThemeToggle className="static" />
        </div>
      </header>
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="py-8 md:py-10 lg:py-12">
          {isLoading ? (
            <div className="space-y-12">
               <div className="h-10 w-full max-w-md bg-muted rounded-md animate-pulse" />
               <DataTableSkeleton />
            </div>
          ) : (
            <Tabs defaultValue="properties" className="space-y-6">
              <div className="flex items-center justify-between">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                  <TabsTrigger value="properties">Properties</TabsTrigger>
                  <TabsTrigger value="land">Land Supply</TabsTrigger>
                  {showValuation && <TabsTrigger value="valuation">Valuation</TabsTrigger>}
                </TabsList>
              </div>
              <TabsContent value="properties" className="animate-in fade-in-50 duration-500 outline-none">
                <PropertiesTable data={MOCK_PROPERTIES[id || ''] || []} />
              </TabsContent>
              <TabsContent value="land" className="animate-in fade-in-50 duration-500 outline-none">
                <LandSupplyTable data={MOCK_LAND_SUPPLY[id || ''] || []} />
              </TabsContent>
              {showValuation && (
                <TabsContent value="valuation" className="animate-in fade-in-50 duration-500 outline-none">
                  <ValuationTable data={MOCK_VALUATION[id || ''] || []} />
                </TabsContent>
              )}
            </Tabs>
          )}
        </div>
      </main>
      <footer className="py-8 border-t text-center text-xs text-muted-foreground mt-auto">
        &copy; {new Date().getFullYear()} PrimeSpace Analytics — High Performance Property Intelligence
      </footer>
    </div>
  );
}