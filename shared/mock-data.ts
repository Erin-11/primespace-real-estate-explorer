import { User, Chat, ChatMessage } from './types';
export interface Department {
  id: string;
  name: string;
  description: string;
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
}
export interface LandSupply {
  id: string;
  address: string;
  usage: string;
  projectName: string;
  area: string;
  year: string;
}
export interface Valuation {
  id: string;
  address: string;
  date: string;
  propertyType: string;
  area: string;
  valuationType: string;
  valuer: string;
}
export const DEPARTMENTS: Department[] = [
  { id: 'hong-kong', name: 'Hong Kong', description: 'Island and surrounding districts residential & retail markets.' },
  { id: 'kowloon', name: 'Kowloon', description: 'Kowloon peninsula real estate and urban developments.' },
  { id: 'commercial-sales', name: 'Commercial Sales', description: 'Investment grade office buildings and retail podiums.' },
  { id: 'sz', name: 'Shenzhen', description: 'Cross-border residential and tech-hub commercial hubs.' },
  { id: 'gz', name: 'Guangzhou', description: 'GBA capital city industrial and residential portfolios.' },
  { id: 'industrial', name: 'Industrial', description: 'Logistics, warehouses, and cold storage facilities.' },
];
export const MOCK_PROPERTIES: Record<string, Property[]> = {
  'hong-kong': [
    {
      id: '1',
      buildingName: 'Two IFC',
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
      contacts: '+852 2800 1234'
    },
    {
      id: '2',
      buildingName: 'The Landmark',
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
      contacts: '+852 2118 3388'
    },
  ],
  'commercial-sales': [
    {
      id: '3',
      buildingName: 'The Center',
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
      contacts: '+852 3456 7890'
    },
    {
      id: '5',
      buildingName: 'Wisma Central',
      floor: '12/F',
      unit: 'A-D',
      zone: 'Wan Chai',
      district: 'HK Island',
      street: '128 Gloucester Road',
      propertyType: 'Commercial',
      source: 'Public Tender',
      area: '8,200 sqft',
      address: '128 Gloucester Road, Wan Chai',
      tenant: 'Tech Start-up X',
      landlord: 'Private Family Office',
      agent: 'Sarah Miller',
      status: 'Active',
      lastUpdated: '2024-05-10',
      availabilityStatus: 'Available',
      contacts: '+852 5550 1212'
    }
  ],
  'industrial': [
    {
      id: '4',
      buildingName: 'ATL Logistics Centre',
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
      contacts: '+852 2489 1000'
    },
    {
      id: '6',
      buildingName: 'Goodman Westlink',
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
      contacts: '+852 9000 8000'
    }
  ]
};
export const MOCK_LAND_SUPPLY: Record<string, LandSupply[]> = {
  'hong-kong': [
    { id: 'l1', address: 'Site 3 Central Waterfront', usage: 'Commercial', projectName: 'Central Landmark', area: '500,000 sqft', year: '2024' },
  ],
  'sz': [
    { id: 'l2', address: 'Qianhai District Plot A1', usage: 'Residential', projectName: 'SZ Heights', area: '120,000 sqm', year: '2025' },
  ]
};
export const MOCK_VALUATION: Record<string, Valuation[]> = {
  'commercial-sales': [
    { id: 'v1', address: '12-14 Des Voeux Road Central', date: '2024-05-20', propertyType: 'Office', area: '15,000 sqft', valuationType: 'Mortgage', valuer: 'Cushman & Wakefield' },
  ],
  'sz': [
    { id: 'v2', address: 'Futian CBD Block 5', date: '2024-03-12', propertyType: 'Residential', area: '8,000 sqm', valuationType: 'Market Value', valuer: 'Colliers International' },
  ]
};
export const MOCK_USERS: User[] = [];
export const MOCK_CHATS: Chat[] = [];
export const MOCK_CHAT_MESSAGES: ChatMessage[] = [];