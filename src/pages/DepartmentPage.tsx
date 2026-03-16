import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DEPARTMENTS, MOCK_PROPERTIES, MOCK_LAND_SUPPLY, MOCK_VALUATION } from '@shared/mock-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PropertiesTable } from '@/components/PropertiesTable';
import { LandSupplyTable } from '@/components/LandSupplyTable';
import { ValuationTable } from '@/components/ValuationTable';
import { DataTableSkeleton } from '@/components/DataTableSkeleton';
import { DepartmentStats } from '@/components/DepartmentStats';
import { AppLayout } from '@/components/layout/AppLayout';
export function DepartmentPage() {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const department = useMemo(() => {
    if (!id) return undefined;
    return DEPARTMENTS.find((d) => d.id === id);
  }, [id]);
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 400);
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
    <AppLayout container contentClassName="py-0">
      <div className="space-y-8">
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
              <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-1">Institutional Intelligence</p>
                  <h1 className="text-4xl font-black tracking-tighter">
                    {department.name} <span className="text-muted-foreground/30">/</span> Explorer
                  </h1>
                </div>
              </div>
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
    </AppLayout>
  );
}