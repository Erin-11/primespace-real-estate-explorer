import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DEPARTMENTS, MOCK_PROPERTIES, MOCK_LAND_SUPPLY, MOCK_VALUATION } from '@shared/mock-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PropertiesTable } from '@/components/PropertiesTable';
import { LandSupplyTable } from '@/components/LandSupplyTable';
import { ValuationTable } from '@/components/ValuationTable';
import { ThemeToggle } from '@/components/ThemeToggle';
import { DataTableSkeleton } from '@/components/DataTableSkeleton';
import { DepartmentStats } from '@/components/DepartmentStats';
export function DepartmentPage() {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const department = useMemo(() => {
    if (!id) return undefined;
    return DEPARTMENTS.find((d) => d.id === id);
  }, [id]);
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, [id]);
  if (!department) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-6 text-center px-4">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
          <LayoutDashboard className="w-8 h-8 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Department Not Found</h1>
          <p className="text-muted-foreground">The requested section could not be located in our database.</p>
        </div>
        <Link to="/" className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Selection
        </Link>
      </div>
    );
  }
  const showValuation = department.id !== 'hong-kong' && department.id !== 'kowloon';
  const properties = MOCK_PROPERTIES[id || ''] || [];
  const landSupply = MOCK_LAND_SUPPLY[id || ''] || [];
  const valuations = MOCK_VALUATION[id || ''] || [];
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b bg-background/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4 overflow-hidden">
            <Link
              to="/"
              className="p-2 hover:bg-secondary rounded-full transition-all hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-ring outline-none"
              aria-label="Back to home"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground leading-none mb-1">Department</span>
              <h1 className="text-lg font-bold tracking-tight truncate max-w-[200px] sm:max-w-none">
                {department.name} Explorer
              </h1>
            </div>
          </div>
          <ThemeToggle className="static" />
        </div>
      </header>
      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key={`loading-${id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-12"
              >
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-32 bg-muted/50 rounded-xl animate-pulse" />
                    ))}
                 </div>
                 <DataTableSkeleton />
              </motion.div>
            ) : (
              <motion.div
                key={`content-${id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <DepartmentStats
                  properties={properties}
                  landSupply={landSupply}
                  valuations={valuations}
                />
                <Tabs defaultValue="properties" className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-1">
                    <TabsList className="grid w-full sm:w-auto grid-cols-2 lg:grid-cols-3 bg-secondary/50 p-1 h-auto">
                      <TabsTrigger value="properties" className="py-2.5 px-6 font-semibold data-[state=active]:shadow-sm data-[state=active]:bg-background">Properties</TabsTrigger>
                      <TabsTrigger value="land" className="py-2.5 px-6 font-semibold data-[state=active]:shadow-sm data-[state=active]:bg-background">Land Supply</TabsTrigger>
                      {showValuation && (
                        <TabsTrigger value="valuation" className="py-2.5 px-6 font-semibold data-[state=active]:shadow-sm data-[state=active]:bg-background">Valuation</TabsTrigger>
                      )}
                    </TabsList>
                  </div>
                  <div className="mt-6">
                    <TabsContent value="properties" className="mt-0 focus-visible:outline-none focus:outline-none">
                      <PropertiesTable data={properties} />
                    </TabsContent>
                    <TabsContent value="land" className="mt-0 focus-visible:outline-none focus:outline-none">
                      <LandSupplyTable data={landSupply} />
                    </TabsContent>
                    {showValuation && (
                      <TabsContent value="valuation" className="mt-0 focus-visible:outline-none focus:outline-none">
                        <ValuationTable data={valuations} />
                      </TabsContent>
                    )}
                  </div>
                </Tabs>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <footer className="py-10 border-t bg-muted/10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs font-bold text-muted-foreground/60 uppercase tracking-[0.2em]">
            &copy; {new Date().getFullYear()} PrimeSpace Analytics — High Performance Property Intelligence
          </p>
        </div>
      </footer>
    </div>
  );
}