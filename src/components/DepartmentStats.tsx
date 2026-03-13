import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Hash, Maximize2, Activity } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Property, LandSupply, Valuation } from '@shared/mock-data';
interface DepartmentStatsProps {
  properties: Property[];
  landSupply: LandSupply[];
  valuations: Valuation[];
}
export function DepartmentStats({ properties, landSupply, valuations }: DepartmentStatsProps) {
  const stats = useMemo(() => {
    // Helper to parse "25,000 sqft" or "12,000 sqm" into numbers
    const parseArea = (areaStr: string) => {
      const match = areaStr.match(/[\d,.]+/);
      if (!match) return 0;
      return parseFloat(match[0].replace(/,/g, ''));
    };
    const totalPropArea = properties.reduce((acc, p) => acc + parseArea(p.area), 0);
    const avgArea = properties.length > 0 ? totalPropArea / properties.length : 0;
    return [
      {
        label: 'Total Inventory',
        value: properties.length + landSupply.length + valuations.length,
        subtext: `${properties.length} Active Listings`,
        icon: <Hash className="w-5 h-5" />,
      },
      {
        label: 'Aggregate Area',
        value: totalPropArea.toLocaleString(),
        subtext: 'Calculated sqft / sqm',
        icon: <Maximize2 className="w-5 h-5" />,
      },
      {
        label: 'Avg. Unit Size',
        value: Math.round(avgArea).toLocaleString(),
        subtext: 'Square footage mean',
        icon: <Activity className="w-5 h-5" />,
      },
    ];
  }, [properties, landSupply, valuations]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, idx) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1, duration: 0.5 }}
        >
          <Card className="border-muted shadow-soft hover:shadow-md transition-all duration-300 overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-110 transition-transform">
              {stat.icon}
            </div>
            <CardHeader className="pb-2">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</p>
              <CardTitle className="text-3xl font-black tracking-tighter">
                {stat.value}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs font-medium text-muted-foreground/70">
                {stat.subtext}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}