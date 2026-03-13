import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { DEPARTMENTS, MOCK_PROPERTIES, MOCK_LAND_SUPPLY, MOCK_VALUATION } from '@shared/mock-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PropertiesTable } from '@/components/PropertiesTable';
import { LandSupplyTable } from '@/components/LandSupplyTable';
import { ValuationTable } from '@/components/ValuationTable';
import { ThemeToggle } from '@/components/ThemeToggle';
export function DepartmentPage() {
  const { id } = useParams<{ id: string }>();
  const department = DEPARTMENTS.find((d) => d.id === id);
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
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 hover:bg-secondary rounded-full transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-semibold tracking-tight">{department.name} Explorer</h1>
          </div>
          <ThemeToggle className="static" />
        </div>
      </header>
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="py-8 md:py-10 lg:py-12">
          <Tabs defaultValue="properties" className="space-y-6">
            <div className="flex items-center justify-between">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="properties">Properties</TabsTrigger>
                <TabsTrigger value="land">Land Supply</TabsTrigger>
                {showValuation && <TabsTrigger value="valuation">Valuation</TabsTrigger>}
              </TabsList>
            </div>
            <TabsContent value="properties" className="animate-in fade-in-50 duration-500">
              <PropertiesTable data={MOCK_PROPERTIES[id || ''] || []} />
            </TabsContent>
            <TabsContent value="land" className="animate-in fade-in-50 duration-500">
              <LandSupplyTable data={MOCK_LAND_SUPPLY[id || ''] || []} />
            </TabsContent>
            {showValuation && (
              <TabsContent value="valuation" className="animate-in fade-in-50 duration-500">
                <ValuationTable data={MOCK_VALUATION[id || ''] || []} />
              </TabsContent>
            )}
          </Tabs>
        </div>
      </main>
    </div>
  );
}