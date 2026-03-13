import React, { useMemo, useState, useEffect } from 'react';
import { motion, animate } from 'framer-motion';
import { Hash, Maximize2, Activity, Info } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Property, LandSupply, Valuation } from '@shared/mock-data';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
function Counter({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        setDisplayValue(v);
      },
    });
    return () => controls.stop();
  }, [value]);
  return <span>{displayValue.toLocaleString(undefined, { maximumFractionDigits: decimals })}</span>;
}
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
    const parseArea = (areaStr: string | number | undefined | null) => {
      if (!areaStr) return 0;
      const s = String(areaStr).toLowerCase().replace(/,/g, '').trim();
      if (s === 'n/a' || s === 'unknown' || s === '-') return 0;
      const match = s.match(/[\d.]+/);
      if (!match) return 0;
      let val = parseFloat(match[0]);
      if (isNaN(val)) return 0;
      // Convert SQM to SQFT if detected
      if (s.includes('sqm') || s.includes('m2')) return val * 10.7639;
      return val;
    };
    const propArea = properties.reduce((acc, p) => acc + parseArea(p.area), 0);
    const landArea = landSupply.reduce((acc, l) => acc + parseArea(l.area), 0);
    const valArea = valuations.reduce((acc, v) => acc + parseArea(v.area), 0);
    const totalAreaSum = propArea + landArea + valArea;
    const totalCount = (properties?.length || 0) + (landSupply?.length || 0) + (valuations?.length || 0);
    const avgArea = totalCount > 0 ? totalAreaSum / totalCount : 0;
    return [
      {
        label: 'Portfolio Items',
        value: totalCount,
        subtext: 'Aggregated database records',
        info: 'The total number of unique property, land, and valuation records for this department.',
        icon: <Hash className="w-4 h-4" />,
        color: 'text-indigo-500'
      },
      {
        label: 'Total Department Coverage',
        value: totalAreaSum,
        unit: 'SQFT',
        subtext: 'Combined gross floor area',
        info: 'Sum of the area for all tracked assets. Metric units are automatically converted to SQFT.',
        icon: <Maximize2 className="w-4 h-4" />,
        color: 'text-orange-500'
      },
      {
        label: 'Avg Asset Footprint',
        value: avgArea,
        unit: 'SQFT',
        subtext: 'Mean asset size across categories',
        info: 'The average floor area per record across all database categories.',
        icon: <Activity className="w-4 h-4" />,
        color: 'text-emerald-500'
      },
    ];
  }, [properties, landSupply, valuations]);
  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card className="border-border shadow-soft hover:shadow-glow transition-all duration-500 overflow-hidden relative group">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary/20 to-transparent" />
              <CardHeader className="pb-2 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={cn("p-1.5 rounded-md bg-secondary", stat.color)}>
                      {stat.icon}
                    </span>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="text-muted-foreground/30 hover:text-primary transition-colors">
                        <Info className="w-3.5 h-3.5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="max-w-[200px] text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                      {stat.info}
                    </TooltipContent>
                  </Tooltip>
                </div>
                <CardTitle className="text-3xl font-black tracking-tighter flex items-baseline gap-2">
                  <Counter value={stat.value} />
                  {stat.unit && <span className="text-[10px] font-black text-muted-foreground/40 tracking-widest">{stat.unit}</span>}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
                  {stat.subtext}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </TooltipProvider>
  );
}