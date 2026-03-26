import { User, Chat, ChatMessage, GlobalContact } from './types';
export interface Department {
  id: string;
  name: string;
  description: string;
}
export interface ContactRecord {
  name: string;
  phone: string;
  email: string;
  role: string;
  company?: string;
  type: 'current' | 'historical';
  category: 'Tenant' | 'Landlord' | 'Legal' | 'Agency';
}
export interface Property {
  id: string;
  buildingName: string;
  floor: string;
  unit: string;
  zone: string;
  district: string;
  street: string;
  propertyType: 'Commercial' | 'Residential' | 'Retail' | 'Hotel' | 'Industrial' | 'Other';
  source: string;
  area: string;
  address: string;
  tenant: string;
  landlord: string;
  agent: string;
  status: string;
  lastUpdated: string;
  availabilityStatus: 'Available' | 'Leased' | 'Under Offer';
  contacts: string;
  contactRecords: ContactRecord[];
  departmentId: string;
}
export interface LandSupply {
  id: string;
  address: string;
  usage: string;
  projectName: string;
  area: string;
  year: string;
  departmentId: string;
}
export interface Valuation {
  id: string;
  address: string;
  date: string;
  propertyType: string;
  area: string;
  valuationType: string;
  valuer: string;
  departmentId: string;
}
export const DEPARTMENTS: Department[] = [
  { id: 'hong-kong', name: 'Hong Kong', description: 'Island and surrounding districts residential & retail markets.' },
  { id: 'kowloon', name: 'Kowloon', description: 'Kowloon peninsula real estate and urban developments.' },
  { id: 'commercial-sales', name: 'Commercial Sales', description: 'Investment grade office buildings and retail podiums.' },
  { id: 'sz', name: 'Shenzhen', description: 'Cross-border residential and tech-hub commercial hubs.' },
  { id: 'gz', name: 'Guangzhou', description: 'GBA capital city industrial and residential portfolios.' },
  { id: 'industrial', name: 'Industrial', description: 'Logistics, warehouses, and cold storage facilities.' },
];
export const MOCK_CONTACTS: GlobalContact[] = [
  { id: 'c1', firstName: 'Sarah', lastName: 'Jenkins', chineseName: '甄莎拉', email: 's.jenkins@institutional.com', phone1: '+852 9123 4567', role: 'Leasing Director', category: 'Tenant' },
  { id: 'c2', firstName: 'Robert', lastName: 'Chen', chineseName: '陳志遠', email: 'r.chen@ownership.hk', phone1: '+852 2100 8888', role: 'Asset Manager', category: 'Landlord' },
  { id: 'c3', firstName: 'Michael', lastName: 'Kwok', chineseName: '郭炳基', email: 'm.kwok@former-tenant.com', phone1: '+852 3400 1122', role: 'Operations Head', category: 'Tenant' },
  { id: 'c4', firstName: 'Linda', lastName: 'Wong', chineseName: '王曉玲', email: 'linda.w@legal-associates.com', phone1: '+852 5500 9900', role: 'General Counsel', category: 'Legal' },
  { id: 'c5', firstName: 'David', lastName: 'Miller', chineseName: '米大維', email: 'd.miller@agency-prime.com', phone1: '+852 6700 3344', role: 'Senior Negotiator', category: 'Agency' },
];
const COMMON_CONTACTS: ContactRecord[] = [
  { name: 'Sarah Jenkins', phone: '+852 9123 4567', email: 's.jenkins@institutional.com', role: 'Leasing Director', category: 'Tenant', type: 'current' },
  { name: 'Robert Chen', phone: '+852 2100 8888', email: 'r.chen@ownership.hk', role: 'Asset Manager', category: 'Landlord', type: 'current' },
  { name: 'Linda Wong', phone: '+852 5500 9900', email: 'linda.w@legal-associates.com', role: 'General Counsel', category: 'Legal', type: 'current' },
  { name: 'Michael Kwok', phone: '+852 3400 1122', email: 'm.kwok@former-tenant.com', role: 'Operations Head', category: 'Tenant', type: 'historical' },
  { name: 'David Miller', phone: '+852 6700 3344', email: 'd.miller@agency-prime.com', role: 'Senior Negotiator', category: 'Agency', type: 'current' },
];
export const MOCK_PROPERTIES: Record<string, Property[]> = {
  'hong-kong': [
    { id: 'hk-1', buildingName: 'Two IFC', floor: '88/F', unit: 'Whole Floor', zone: 'Central', district: 'HK Island', street: '8 Finance Street', propertyType: 'Commercial', source: 'Internal Registry', area: '25,000 sqft', address: '8 Finance Street, Central, Hong Kong', tenant: 'State Street Global', landlord: 'Henderson Land Dev.', agent: 'Jonathan Wick', status: 'Active Listing', lastUpdated: '2024-05-15', availabilityStatus: 'Leased', contacts: '+852 2800 1234', contactRecords: [], departmentId: 'hong-kong' },
  ],
  'kowloon': [
    { id: 'kw-1', buildingName: 'ICC', floor: '95/F', unit: 'Whole', zone: 'West Kowloon', district: 'Kowloon', street: '1 Austin Road West', propertyType: 'Commercial', source: 'Premium Feed', area: '30,000 sqft', address: '1 Austin Road West, Kowloon', tenant: 'Morgan Stanley', landlord: 'SHKP Group', agent: 'James Bond', status: 'Flagship', lastUpdated: '2024-05-22', availabilityStatus: 'Leased', contacts: '+852 3666 0000', contactRecords: [], departmentId: 'kowloon' }
  ],
  'commercial-sales': [
    { id: 'cs-3', buildingName: 'The Center', floor: 'High Zone', unit: 'Entire Floor', zone: 'Central', district: 'HK Island', street: '99 Queen\'s Road Central', propertyType: 'Commercial', source: 'Confidential Listing', area: '24,000 sqft', address: '99 Queen\'s Road Central, Hong Kong', tenant: 'Goldman Sachs APAC', landlord: 'Consortium 99', agent: 'Marcus Cheng', status: 'Off-Market', lastUpdated: '2024-05-14', availabilityStatus: 'Under Offer', contacts: '+852 3456 7890', contactRecords: [], departmentId: 'commercial-sales' },
  ],
  'sz': [
    { id: 'sz-1', buildingName: 'Ping An Finance Centre', floor: '100/F', unit: 'A', zone: 'Futian', district: 'Shenzhen', street: '16 Fuhua 4th Rd', propertyType: 'Commercial', source: 'GBA Registry', area: '3,200 sqm', address: '16 Fuhua 4th Rd, Futian District, Shenzhen', tenant: 'Ping An Tech', landlord: 'Ping An Property', agent: 'Chen Wei', status: 'Iconic Asset', lastUpdated: '2024-05-20', availabilityStatus: 'Leased', contacts: '+86 755 8888 9999', contactRecords: [], departmentId: 'sz' }
  ],
  'gz': [
    { id: 'gz-1', buildingName: 'CTF Finance Centre', floor: '90/F', unit: 'B', zone: 'Tianhe', district: 'Guangzhou', street: '6 Zhujiang East Rd', propertyType: 'Commercial', source: 'Institutional', area: '2,800 sqm', address: '6 Zhujiang East Rd, Tianhe, Guangzhou', tenant: 'KPMG GZ', landlord: 'New World Dev.', agent: 'Li Xiao', status: 'Prime', lastUpdated: '2024-05-19', availabilityStatus: 'Leased', contacts: '+86 20 1234 5678', contactRecords: [], departmentId: 'gz' }
  ],
  'industrial': [
    { id: 'ind-4', buildingName: 'ATL Logistics Centre', floor: '4/F', unit: 'Block B2', zone: 'Kwai Chung', district: 'New Territories', street: 'Container Port Road South', propertyType: 'Industrial', source: 'Logistics Network', area: '50,000 sqft', address: 'Container Port Road South, Kwai Chung', tenant: 'DHL Supply Chain', landlord: 'Goodman Group', agent: 'Kevin Lee', status: 'Active Managed', lastUpdated: '2024-05-08', availabilityStatus: 'Leased', contacts: '+852 2489 1000', contactRecords: [], departmentId: 'industrial' }
  ]
};
export const MOCK_LAND_SUPPLY: Record<string, LandSupply[]> = {
  'hong-kong': [{ id: 'l1', address: 'Site 3 Central Waterfront', usage: 'Commercial', projectName: 'Central Landmark', area: '500,000 sqft', year: '2024', departmentId: 'hong-kong' }],
  'sz': [{ id: 'l2', address: 'Qianhai District Plot A1', usage: 'Residential', projectName: 'SZ Heights', area: '120,000 sqm', year: '2025', departmentId: 'sz' }],
};
export const MOCK_VALUATION: Record<string, Valuation[]> = {
  'hong-kong': [{ id: 'v_hk', address: 'Peak Road Estate', date: '2024-06-01', propertyType: 'Residential', area: '5,000 sqft', valuationType: 'Market Value', valuer: '	may.tam', departmentId: 'hong-kong' }],
  'kowloon': [{ id: 'v_kw', address: 'Nathan Road Retail', date: '2024-05-25', propertyType: 'Retail', area: '2,000 sqft', valuationType: 'Mortgage', valuer: '	may.tam', departmentId: 'kowloon' }],
  'commercial-sales': [{ id: 'v1', address: '12-14 Des Voeux Road Central', date: '2024-05-20', propertyType: 'Office', area: '15,000 sqft', valuationType: 'frankie.lau', valuer: 'joe.tsang', departmentId: 'commercial-sales' }],
  'sz': [{ id: 'v2', address: 'Futian CBD Block 5', date: '2024-03-12', propertyType: 'Residential', area: '8,000 sqm', valuationType: 'Market Value', valuer: 'ricky.cheung', departmentId: 'sz' }],
  'gz': [{ id: 'v_gz', address: 'Zhujiang New Town Tower', date: '2024-04-10', propertyType: 'Office', area: '10,000 sqm', valuationType: 'Institutional', valuer: 'ricky.cheung', departmentId: 'gz' }],
  'industrial': [{ id: 'v_ind', address: 'Kwai Chung Logistics Hub', date: '2024-05-05', propertyType: 'Industrial', area: '100,000 sqft', valuationType: 'Portfolio', valuer: 'frankie.lau', departmentId: 'industrial' }],
};
export const MOCK_USERS: User[] = [];
export const MOCK_CHATS: Chat[] = [];
export const MOCK_CHAT_MESSAGES: ChatMessage[] = [];