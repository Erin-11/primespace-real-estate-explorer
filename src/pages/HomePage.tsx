import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, Landmark, Factory, MapPin, Globe, Briefcase } from 'lucide-react';
import { DEPARTMENTS } from '@shared/mock-data';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
const iconMap: Record<string, React.ReactNode> = {
  'hong-kong': <Globe className="w-6 h-6" />,
  'kowloon': <MapPin className="w-6 h-6" />,
  'commercial-sales': <Landmark className="w-6 h-6" />,
  'sz': <Building2 className="w-6 h-6" />,
  'gz': <Building2 className="w-6 h-6" />,
  'industrial': <Factory className="w-6 h-6" />,
};
export function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen bg-background">
      <ThemeToggle />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(243,128,32,0.05),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(229,90,27,0.05),transparent_40%)] pointer-events-none" />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 md:py-24 lg:py-32 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-display tracking-tight">
              PrimeSpace <span className="text-gradient">Real Estate</span>
            </h1>
            <p className="text-body max-w-2xl mx-auto">
              A minimalist explorer for high-performance real estate query and valuation systems.
              Select a department to begin your data-driven journey.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 w-full"
          >
            {DEPARTMENTS.map((dept, index) => (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="cursor-pointer"
                onClick={() => navigate(`/department/${dept.id}`)}
              >
                <Card className="h-full border-muted hover:border-primary/20 hover:shadow-soft transition-all duration-300">
                  <CardHeader className="text-left">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-primary mb-4">
                      {iconMap[dept.id] || <Briefcase className="w-6 h-6" />}
                    </div>
                    <CardTitle className="text-xl font-semibold">{dept.name}</CardTitle>
                    <CardDescription className="line-clamp-2 mt-2">
                      {dept.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
      <footer className="py-12 border-t text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} PrimeSpace Analytics. All rights reserved.
      </footer>
    </div>
  );
}