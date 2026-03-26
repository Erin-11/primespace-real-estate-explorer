import { User, Chat, ChatMessage } from './types';
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
  companyName: string;
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
  departmentId?: string;
}
export interface Valuation {
  id: string;
  address: string;
  date: string;
  propertyType: string;
  area: string;
  valuationType: string;
  valuer: string;
  departmentId?: string;
}
export const DEPARTMENTS: Department[] = [
  { id: 'hong-kong', name: 'Hong Kong', description: 'Island and surrounding districts residential & retail markets.' },
  { id: 'kowloon', name: 'Kowloon', description: 'Kowloon peninsula real estate and urban developments.' },
  { id: 'commercial-sales', name: 'Commercial Sales', description: 'Investment grade office buildings and retail podiums.' },
  { id: 'sz', name: 'Shenzhen', description: 'Cross-border residential and tech-hub commercial hubs.' },
  { id: 'gz', name: 'Guangzhou', description: 'GBA capital city industrial and residential portfolios.' },
  { id: 'industrial', name: 'Industrial', description: 'Logistics, warehouses, and cold storage facilities.' },
];
const generateContacts = (tenant: string, landlord: string): ContactRecord[] => [
  { 
    name: `Sarah Jenkins`, 
    phone: '+852 9123 4567', 
    email: 's.jenkins@institutional.com', 
    role: 'Leasing Director', 
    company: tenant || 'Consortium Partners', 
    type: 'current', 
    category: 'Tenant' 
  },
  { 
    name: `Robert Chen`, 
    phone: '+852 2100 8888', 
    email: 'r.chen@ownership.hk', 
    role: 'Asset Manager', 
    company: landlord || 'Capital Asset Holdings', 
    type: 'current', 
    category: 'Landlord' 
  },
  { 
    name: `Michael Kwok`, 
    phone: '+852 3400 1122', 
    email: 'm.kwok@former-tenant.com', 
    role: 'Operations Head', 
    company: 'Global Logistics Corp', 
    type: 'historical', 
    category: 'Tenant' 
  },
  { 
    name: `Linda Wong`, 
    phone: '+852 5500 9900', 
    email: 'linda.w@legal-associates.com', 
    role: 'General Counsel', 
    company: 'Legal Associates HK', 
    type: 'current', 
    category: 'Legal' 
  },
  { 
    name: `David Miller`, 
    phone: '+852 6700 3344', 
    email: 'd.miller@agency-prime.com', 
    role: 'Senior Negotiator', 
    company: 'Prime Agency Partners', 
    type: 'current', 
    category: 'Agency' 
  },
  { 
    name: `James Wilson`, 
    phone: '+852 4433 2211', 
    email: 'j.wilson@legacy-holdings.com', 
    role: 'Previous Owner', 
    company: 'Legacy Holdings Ltd', 
    type: 'historical', 
    category: 'Landlord' 
  },
];
export const MOCK_PROPERTIES: Record<string, Property[]> = {
  'hong-kong': [
    {
      id: 'hk-1',
      buildingName: 'Two IFC',
      companyName: 'IFC Development Ltd',
      floor: '88/F',
      unit: 'Whole Floor',
      zone: 'Central',
      district: 'HK Island',
      street: '8 Finance Street',
      propertyType: 'Commercial',
      source: 'Internal Registry',
      area: '25,000 sqft',
      address: '8 Finance Street, Central, Hong Kong',
      tenant: 'State Street Global',
      landlord: 'Henderson Land Dev.',
      agent: 'Jonathan Wick',
      status: 'Active Listing',
      lastUpdated: '2024-05-15',
      availabilityStatus: 'Leased',
      contacts: '+852 2800 1234',
      contactRecords: generateContacts('State Street Global', 'Henderson Land Dev.'),
      departmentId: 'hong-kong'
    },
    {
      id: 'hk-2',
      buildingName: 'The Landmark',
      companyName: 'Hongkong Land Ltd',
      floor: 'LG1',
      unit: '24',
      zone: 'Central',
      district: 'HK Island',
      street: '15 Queen\'s Road Central',
      propertyType: 'Retail',
      source: 'Direct Mandate',
      area: '3,500 sqft',
      address: '15 Queen\'s Road Central, Hong Kong',
      tenant: 'Louis Vuitton',
      landlord: 'Hongkong Land',
      agent: 'Eleanor Vance',
      status: 'High Interest',
      lastUpdated: '2024-05-12',
      availabilityStatus: 'Leased',
      contacts: '+852 2118 3388',
      contactRecords: generateContacts('Louis Vuitton', 'Hongkong Land'),
      departmentId: 'hong-kong'
    },
  ],
  'commercial-sales': [
    {
      id: 'cs-3',
      buildingName: 'The Center',
      companyName: 'Consortium 99 Holdings',
      floor: 'High Zone',
      unit: 'Entire Floor',
      zone: 'Central',
      district: 'HK Island',
      street: '99 Queen\'s Road Central',
      propertyType: 'Commercial',
      source: 'Confidential Listing',
      area: '24,000 sqft',
      address: '99 Queen\'s Road Central, Hong Kong',
      tenant: 'Goldman Sachs APAC',
      landlord: 'Consortium 99',
      agent: 'Marcus Cheng',
      status: 'Off-Market',
      lastUpdated: '2024-05-14',
      availabilityStatus: 'Under Offer',
      contacts: '+852 3456 7890',
      contactRecords: generateContacts('Goldman Sachs APAC', 'Consortium 99'),
      departmentId: 'commercial-sales'
    },
    {
      id: 'cs-4',
      buildingName: 'AIA Central',
      companyName: 'AIA Group Limited',
      floor: '25/F',
      unit: 'A',
      zone: 'Central',
      district: 'HK Island',
      street: '1 Connaught Road Central',
      propertyType: 'Commercial',
      source: 'Institutional Feed',
      area: '12,500 sqft',
      address: '1 Connaught Road Central, Hong Kong',
      tenant: 'AIA Premium Service',
      landlord: 'AIA Group',
      agent: 'Sarah Miller',
      status: 'Active',
      lastUpdated: '2024-05-18',
      availabilityStatus: 'Leased',
      contacts: '+852 2232 8888',
      contactRecords: generateContacts('AIA Premium Service', 'AIA Group'),
      departmentId: 'commercial-sales'
    }
  ],
  'industrial': [
    {
      id: 'ind-4',
      buildingName: 'ATL Logistics Centre',
      companyName: 'ATL Logistics Centre Hong Kong Ltd',
      floor: '4/F',
      unit: 'Block B2',
      zone: 'Kwai Chung',
      district: 'New Territories',
      street: 'Container Port Road South',
      propertyType: 'Industrial',
      source: 'Logistics Network',
      area: '50,000 sqft',
      address: 'Container Port Road South, Kwai Chung',
      tenant: 'DHL Supply Chain',
      landlord: 'Goodman Group',
      agent: 'Kevin Lee',
      status: 'Active Managed',
      lastUpdated: '2024-05-08',
      availabilityStatus: 'Leased',
      contacts: '+852 2489 1000',
      contactRecords: generateContacts('DHL Supply Chain', 'Goodman Group'),
      departmentId: 'industrial'
    },
    {
      id: 'ind-6',
      buildingName: 'Goodman Westlink',
      companyName: 'Goodman Property Services',
      floor: 'G/F',
      unit: '101',
      zone: 'Tuen Mun',
      district: 'New Territories',
      street: '15-17 Hung Cheung Road',
      propertyType: 'Industrial',
      source: 'Owner Direct',
      area: '15,000 sqft',
      address: '15-17 Hung Cheung Road, Tuen Mun',
      tenant: 'Vacant',
      landlord: 'Goodman',
      agent: 'Ray Tam',
      status: 'Ready for Fit-out',
      lastUpdated: '2024-05-16',
      availabilityStatus: 'Available',
      contacts: '+852 9000 8000',
      contactRecords: generateContacts('Vacant Property', 'Goodman Industrial'),
      departmentId: 'industrial'
    }
  ],
  'sz': [
    {
      id: 'sz-1',
      buildingName: 'Ping An Finance Centre',
      companyName: 'Ping An Insurance Group',
      floor: '100/F',
      unit: 'A',
      zone: 'Futian',
      district: 'Shenzhen',
      street: '16 Fuhua 4th Rd',
      propertyType: 'Commercial',
      source: 'GBA Registry',
      area: '3,200 sqm',
      address: '16 Fuhua 4th Rd, Futian District, Shenzhen',
      tenant: 'Ping An Tech',
      landlord: 'Ping An Property',
      agent: 'Chen Wei',
      status: 'Iconic Asset',
      lastUpdated: '2024-05-20',
      availabilityStatus: 'Leased',
      contacts: '+86 755 8888 9999',
      contactRecords: generateContacts('Ping An Tech', 'Ping An Group'),
      departmentId: 'sz'
    }
  ],
  'kowloon': [
    {
      id: 'kw-1',
      buildingName: 'ICC',
      companyName: 'Sun Hung Kai Properties',
      floor: '95/F',
      unit: 'Whole',
      zone: 'West Kowloon',
      district: 'Kowloon',
      street: '1 Austin Road West',
      propertyType: 'Commercial',
      source: 'Premium Feed',
      area: '30,000 sqft',
      address: '1 Austin Road West, Kowloon',
      tenant: 'Morgan Stanley',
      landlord: 'SHKP Group',
      agent: 'James Bond',
      status: 'Flagship',
      lastUpdated: '2024-05-22',
      availabilityStatus: 'Leased',
      contacts: '+852 3666 0000',
      contactRecords: generateContacts('Morgan Stanley APAC', 'Sun Hung Kai Properties'),
      departmentId: 'kowloon'
    }
  ],
  'gz': [
    {
      id: 'gz-1',
      buildingName: 'CTF Finance Centre',
      companyName: 'New World Development',
      floor: '90/F',
      unit: 'B',
      zone: 'Tianhe',
      district: 'Guangzhou',
      street: '6 Zhujiang East Rd',
      propertyType: 'Commercial',
      source: 'Institutional',
      area: '2,800 sqm',
      address: '6 Zhujiang East Rd, Tianhe, Guangzhou',
      tenant: 'KPMG GZ',
      landlord: 'New World Dev.',
      agent: 'Li Xiao',
      status: 'Prime',
      lastUpdated: '2024-05-19',
      availabilityStatus: 'Leased',
      contacts: '+86 20 1234 5678',
      contactRecords: generateContacts('KPMG Guangzhou', 'New World China'),
      departmentId: 'gz'
    }
  ]
};
export const MOCK_LAND_SUPPLY: Record<string, LandSupply[]> = {
  'hong-kong': [
    { id: 'l1', address: 'Site 3 Central Waterfront', usage: 'Commercial', projectName: 'Central Landmark', area: '500,000 sqft', year: '2024', departmentId: 'hong-kong' },
  ],
  'sz': [
    { id: 'l2', address: 'Qianhai District Plot A1', usage: 'Residential', projectName: 'SZ Heights', area: '120,000 sqm', year: '2025', departmentId: 'sz' },
  ]
};
export const MOCK_VALUATION: Record<string, Valuation[]> = {
  'commercial-sales': [
    { id: 'v1', address: '12-14 Des Voeux Road Central', date: '2024-05-20', propertyType: 'Office', area: '15,000 sqft', valuationType: 'Mortgage', valuer: 'Cushman & Wakefield', departmentId: 'commercial-sales' },
  ],
  'sz': [
    { id: 'v2', address: 'Futian CBD Block 5', date: '2024-03-12', propertyType: 'Residential', area: '8,000 sqm', valuationType: 'Market Value', valuer: 'Colliers International', departmentId: 'sz' },
  ]
};
export const MOCK_USERS: User[] = [];
export const MOCK_CHATS: Chat[] = [];
export const MOCK_CHAT_MESSAGES: ChatMessage[] = [];