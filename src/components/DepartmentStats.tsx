import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Hash, Maximize2, Activity } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Property, LandSupply, Valuation } from '@shared/mock-data';
import { cn } from '@/lib/utils';
interface DepartmentStatsProps {
  properties?: Property[];
  landSupply?: LandSupply[];
  valuations?: Valuation[];
}
export function DepartmentStats({
  properties = [],
  landSupply = [],
  valuations = []
}: DepartmentStatsProps) {
  const stats = useMemo(() => {
    // Robust area parser handling various institutional formats
    const parseArea = (areaStr: string | number | undefined | null) => {
      if (areaStr === undefined || areaStr === null) return 0;
      const str = String(areaStr).toLowerCase();
      // Extract numeric value, handling commas, decimals, and multiple segments
      const match = str.replace(/,/g, '').match(/[\d.]+/);
      if (!match) return 0;
      let val = parseFloat(match[0]);
      if (isNaN(val)) return 0;
      // Handle simple conversion if needed (baseline is sqft)
      if (str.includes('sqm') || str.includes('sq m') || str.includes('m²')) {
        return val * 10.7639; // Convert sqm to sqft for consistency
      }
      return val;
    };
    const propArea = Array.isArray(properties) ? properties.reduce((acc, p) => acc + parseArea(p.area), 0) : 0;
    const landArea = Array.isArray(landSupply) ? landSupply.reduce((acc, l) => acc + parseArea(l.area), 0) : 0;
    const valArea = Array.isArray(valuations) ? valuations.reduce((acc, v) => acc + parseArea(v.area), 0) : 0;
    const totalAreaSum = propArea + landArea + valArea;
    const totalCount = (properties?.length || 0) + (landSupply?.length || 0) + (valuations?.length || 0);
    const avgArea = totalCount > 0 ? totalAreaSum / totalCount : 0;
    return [
      {
        label: 'Portfolio Items',
        value: totalCount,
        subtext: 'Aggregated database records',
        icon: <Hash className="w-4 h-4" />,
        color: 'text-indigo-500'
      },
      {
        label: 'Total Department Coverage',
        value: totalAreaSum.toLocaleString(undefined, { maximumFractionDigits: 0 }),
        unit: 'SQFT',
        subtext: 'Combined gross floor area',
        icon: <Maximize2 className="w-4 h-4" />,
        color: 'text-orange-500'
      },
      {
        label: 'Institutional Asset Avg',
        value: Math.round(avgArea).toLocaleString(),
        unit: 'SQFT',
        subtext: 'Mean asset footprint',
        icon: <Activity className="w-4 h-4" />,
        color: 'text-emerald-500'
      },
    ];
  }, [properties, landSupply, valuations]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {stats.map((stat, idx) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            delay: idx * 0.08,
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1]
          }}
        >
          <Card className="border-border shadow-soft hover:shadow-glow transition-all duration-500 overflow-hidden relative group h-full">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 group-hover:scale-125 transition-all duration-500 transform -rotate-12">
              {React.cloneElement(stat.icon as React.ReactElement, { className: 'w-16 h-16' })}
            </div>
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary/10 to-transparent group-hover:from-primary/30 transition-all" />
            <CardHeader className="pb-2 space-y-1">
              <div className="flex items-center gap-2 mb-1">
                <span className={cn("p-1.5 rounded-md bg-secondary transition-colors group-hover:bg-background", stat.color)}>
                  {stat.icon}
                </span>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                  {stat.label}
                </p>
              </div>
              <CardTitle className="text-4xl font-black tracking-tighter flex items-baseline gap-2">
                {stat.value}
                {stat.unit && <span className="text-xs font-bold text-muted-foreground/50 tracking-widest">{stat.unit}</span>}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs font-bold text-muted-foreground/60 transition-colors group-hover:text-muted-foreground">
                {stat.subtext}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}