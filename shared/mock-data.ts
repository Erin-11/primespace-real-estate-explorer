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
export const MOCK_CONTACTS: Record<string, GlobalContact[]> = {
  'hong-kong': [
    { id: 'hk-c1', firstName: 'Sarah', lastName: 'Jenkins', chineseName: '甄莎拉', email: 's.jenkins@institutional.hk', phone1: '+852 9123 4567', role: 'Leasing Director', category: 'Tenant' },
    { id: 'hk-c2', firstName: 'Robert', lastName: 'Chen', chineseName: '陳志遠', email: 'r.chen@ownership.hk', phone1: '+852 2100 8888', role: 'Asset Manager', category: 'Landlord' },
    { id: 'hk-c3', firstName: 'Linda', lastName: 'Wong', chineseName: '王曉玲', email: 'linda.w@legal-associates.hk', phone1: '+852 5500 9900', role: 'General Counsel', category: 'Legal' }
  ],
  'kowloon': [
    { id: 'kw-c1', firstName: 'Michael', lastName: 'Kwok', chineseName: '郭炳基', email: 'm.kwok@kowloon-dev.com', phone1: '+852 3400 1122', role: 'Operations Head', category: 'Tenant' },
    { id: 'kw-c2', firstName: 'David', lastName: 'Miller', chineseName: '米大維', email: 'd.miller@agency-prime.hk', phone1: '+852 6700 3344', role: 'Senior Negotiator', category: 'Agency' }
  ],
  'commercial-sales': [
    { id: 'cs-c1', firstName: 'James', lastName: 'Wilson', chineseName: '韋詹姆斯', email: 'j.wilson@invest-cap.com', phone1: '+852 9888 1234', role: 'Investment VP', category: 'Landlord' },
    { id: 'cs-c2', firstName: 'Alice', lastName: 'Ho', chineseName: '何艾莉', email: 'a.ho@retail-plus.com', phone1: '+852 2333 4444', role: 'Portfolio Manager', category: 'Tenant' },
    { id: 'cs-c3', firstName: 'Thomas', lastName: 'Lee', chineseName: '李湯馬', email: 't.lee@legal-sales.hk', phone1: '+852 5111 2222', role: 'Partner', category: 'Legal' }
  ],
  'sz': [
    { id: 'sz-c1', firstName: 'Wei', lastName: 'Chen', chineseName: '陳偉', email: 'w.chen@sz-tech.cn', phone1: '+86 755 8888 1111', role: 'Tech Park Manager', category: 'Landlord' },
    { id: 'sz-c2', firstName: 'Lucy', lastName: 'Zhang', chineseName: '張露西', email: 'l.zhang@innovation.cn', phone1: '+86 755 2222 3333', role: 'Logistics Head', category: 'Tenant' }
  ],
  'gz': [
    { id: 'gz-c1', firstName: 'Xiao', lastName: 'Li', chineseName: '李曉', email: 'x.li@gz-industrial.cn', phone1: '+86 20 1234 5678', role: 'Factory Director', category: 'Landlord' },
    { id: 'gz-c2', firstName: 'John', lastName: 'Doe', chineseName: '約翰多', email: 'j.doe@global-trade.cn', phone1: '+86 20 8888 9999', role: 'Supply Chain Mgr', category: 'Tenant' }
  ],
  'industrial': [
    { id: 'ind-c1', firstName: 'Kevin', lastName: 'Lee', chineseName: '李凱文', email: 'k.lee@logistics-hub.hk', phone1: '+852 2489 1000', role: 'Facility Manager', category: 'Landlord' },
    { id: 'ind-c2', firstName: 'Betty', lastName: 'Au', chineseName: '區貝蒂', email: 'b.au@cold-storage.hk', phone1: '+852 3100 2000', role: 'Operations Lead', category: 'Tenant' }
  ]
};
const COMMON_CONTACTS: ContactRecord[] = [
  { name: 'Sarah Jenkins', phone: '+852 9123 4567', email: 's.jenkins@institutional.com', role: 'Leasing Director', category: 'Tenant', type: 'current' },
  { name: 'Robert Chen', phone: '+852 2100 8888', email: 'r.chen@ownership.hk', role: 'Asset Manager', category: 'Landlord', type: 'current' },
  { name: 'Linda Wong', phone: '+852 5500 9900', email: 'linda.w@legal-associates.com', role: 'General Counsel', category: 'Legal', type: 'current' },
];
export const MOCK_PROPERTIES: Record<string, Property[]> = {
  'hong-kong': [
    { id: 'hk-1', buildingName: 'Two IFC', floor: '88/F', unit: 'Whole Floor', zone: 'Central', district: 'HK Island', street: '8 Finance Street', propertyType: 'Commercial', source: 'Internal Registry', area: '25,000 sqft', address: '8 Finance Street, Central, Hong Kong', tenant: 'State Street Global', landlord: 'Henderson Land Dev.', agent: 'Jonathan Wick', status: 'Active Listing', lastUpdated: '2024-05-15', availabilityStatus: 'Leased', contacts: '+852 2800 1234', contactRecords: [...COMMON_CONTACTS], departmentId: 'hong-kong' },
  ],
  'kowloon': [
    { id: 'kw-1', buildingName: 'ICC', floor: '95/F', unit: 'Whole', zone: 'West Kowloon', district: 'Kowloon', street: '1 Austin Road West', propertyType: 'Commercial', source: 'Premium Feed', area: '30,000 sqft', address: '1 Austin Road West, Kowloon', tenant: 'Morgan Stanley', landlord: 'SHKP Group', agent: 'James Bond', status: 'Flagship', lastUpdated: '2024-05-22', availabilityStatus: 'Leased', contacts: '+852 3666 0000', contactRecords: [...COMMON_CONTACTS], departmentId: 'kowloon' }
  ],
  'commercial-sales': [
    { id: 'cs-3', buildingName: 'The Center', floor: 'High Zone', unit: 'Entire Floor', zone: 'Central', district: 'HK Island', street: '99 Queen\'s Road Central', propertyType: 'Commercial', source: 'Confidential Listing', area: '24,000 sqft', address: '99 Queen\'s Road Central, Hong Kong', tenant: 'Goldman Sachs APAC', landlord: 'Consortium 99', agent: 'Marcus Cheng', status: 'Off-Market', lastUpdated: '2024-05-14', availabilityStatus: 'Under Offer', contacts: '+852 3456 7890', contactRecords: [...COMMON_CONTACTS], departmentId: 'commercial-sales' },
  ],
  'sz': [
    { id: 'sz-1', buildingName: 'Ping An Finance Centre', floor: '100/F', unit: 'A', zone: 'Futian', district: 'Shenzhen', street: '16 Fuhua 4th Rd', propertyType: 'Commercial', source: 'GBA Registry', area: '3,200 sqm', address: '16 Fuhua 4th Rd, Futian District, Shenzhen', tenant: 'Ping An Tech', landlord: 'Ping An Property', agent: 'Chen Wei', status: 'Iconic Asset', lastUpdated: '2024-05-20', availabilityStatus: 'Leased', contacts: '+86 755 8888 9999', contactRecords: [...COMMON_CONTACTS], departmentId: 'sz' }
  ],
  'gz': [
    { id: 'gz-1', buildingName: 'CTF Finance Centre', floor: '90/F', unit: 'B', zone: 'Tianhe', district: 'Guangzhou', street: '6 Zhujiang East Rd', propertyType: 'Commercial', source: 'Institutional', area: '2,800 sqm', address: '6 Zhujiang East Rd, Tianhe, Guangzhou', tenant: 'KPMG GZ', landlord: 'New World Dev.', agent: 'Li Xiao', status: 'Prime', lastUpdated: '2024-05-19', availabilityStatus: 'Leased', contacts: '+86 20 1234 5678', contactRecords: [...COMMON_CONTACTS], departmentId: 'gz' }
  ],
  'industrial': [
    { id: 'ind-4', buildingName: 'ATL Logistics Centre', floor: '4/F', unit: 'Block B2', zone: 'Kwai Chung', district: 'New Territories', street: 'Container Port Road South', propertyType: 'Industrial', source: 'Logistics Network', area: '50,000 sqft', address: 'Container Port Road South, Kwai Chung', tenant: 'DHL Supply Chain', landlord: 'Goodman Group', agent: 'Kevin Lee', status: 'Active Managed', lastUpdated: '2024-05-08', availabilityStatus: 'Leased', contacts: '+852 2489 1000', contactRecords: [...COMMON_CONTACTS], departmentId: 'industrial' }
  ]
};
export const MOCK_VALUATION: Record<string, Valuation[]> = {
  'hong-kong': [],
  'kowloon': [],
  'commercial-sales': [
    { id: 'v1', address: '12-14 Des Voeux Road Central', date: '2024-05-20', propertyType: 'Office', area: '15,000 sqft', valuationType: 'Mortgage', valuer: 'may.tam', departmentId: 'commercial-sales' },
    { id: 'v2', address: '99 Queen\'s Road Central', date: '2024-06-12', propertyType: 'Commercial', area: '24,000 sqft', valuationType: 'Market Value', valuer: 'may.tam', departmentId: 'commercial-sales' }
  ],
  'sz': [
    { id: 'v3', address: 'Futian CBD Block 5', date: '2024-03-12', propertyType: 'Residential', area: '8,000 sqm', valuationType: 'Market Value', valuer: 'may.tam', departmentId: 'sz' },
    { id: 'v4', address: 'Ping An Finance Centre', date: '2024-04-15', propertyType: 'Commercial', area: '3,200 sqm', valuationType: 'Institutional', valuer: 'may.tam', departmentId: 'sz' }
  ],
  'gz': [
    { id: 'v5', address: 'Zhujiang New Town Tower', date: '2024-04-10', propertyType: 'Office', area: '10,000 sqm', valuationType: 'Institutional', valuer: 'frankie.lau', departmentId: 'gz' },
    { id: 'v6', address: 'CTF Finance Centre', date: '2024-05-18', propertyType: 'Commercial', area: '2,800 sqm', valuationType: 'Portfolio', valuer: 'frankie.lau', departmentId: 'gz' }
  ],
  'industrial': [
    { id: 'v7', address: 'Kwai Chung Logistics Hub', date: '2024-05-05', propertyType: 'Industrial', area: '100,000 sqft', valuationType: 'Portfolio', valuer: 'frankie.lau', departmentId: 'industrial' },
    { id: 'v8', address: 'Container Port Road South', date: '2024-06-01', propertyType: 'Industrial', area: '50,000 sqft', valuationType: 'Asset Review', valuer: 'frankie.lau', departmentId: 'industrial' }
  ],
};
export const MOCK_USERS: User[] = [];
export const MOCK_CHATS: Chat[] = [];
export const MOCK_CHAT_MESSAGES: ChatMessage[] = [];