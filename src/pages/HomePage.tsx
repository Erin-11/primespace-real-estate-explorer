import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, Landmark, Factory, MapPin, Globe, Briefcase, ArrowRight } from 'lucide-react';
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
    <div className="relative min-h-screen bg-background flex flex-col overflow-hidden">
      <ThemeToggle />
      {/* Premium Mesh Gradient Background */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-[0.03] dark:opacity-[0.07] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-primary/[0.02] to-transparent pointer-events-none" />
      <main className="flex-1 flex flex-col items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 md:pt-32 md:pb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-widest animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Intelligence Hub
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-black tracking-tighter leading-[0.9]">
              Prime<span className="text-gradient">Space</span>
            </h1>
            <p className="text-body max-w-2xl mx-auto text-xl md:text-2xl font-medium tracking-tight opacity-80">
              High-performance property exploration. <br className="hidden sm:block" />
              Institutional-grade data at your fingertips.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-24 w-full"
          >
            {DEPARTMENTS.map((dept, index) => (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + (0.1 * index), duration: 0.5 }}
                whileHover={{ y: -10, scale: 1.02 }}
                onClick={() => navigate(`/department/${dept.id}`)}
                className="group cursor-pointer h-full"
              >
                <Card className="h-full border-muted/50 bg-card/50 backdrop-blur-sm group-hover:border-primary/20 group-hover:shadow-2xl group-hover:shadow-primary/5 transition-all duration-500 overflow-hidden relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardHeader className="text-left p-8">
                    <div className="w-14 h-14 rounded-2xl bg-secondary group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center text-primary mb-6 transition-all duration-500 transform group-hover:rotate-6 shadow-sm">
                      {iconMap[dept.id] || <Briefcase className="w-7 h-7" />}
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight mb-3 flex items-center justify-between">
                      {dept.name}
                      <ArrowRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">
                      {dept.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
      <footer className="py-12 border-t bg-muted/20 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
            &copy; {new Date().getFullYear()} PrimeSpace Analytics
          </p>
          <div className="flex items-center gap-8">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/40 hover:text-primary transition-colors cursor-help">Documentation</span>
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/40 hover:text-primary transition-colors cursor-help">Privacy</span>
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/40 hover:text-primary transition-colors cursor-help">Status: Active</span>
          </div>
        </div>
      </footer>
    </div>
  );
}