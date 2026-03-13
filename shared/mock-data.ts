import { User, Chat, ChatMessage } from './types';
export interface Department {
  id: string;
  name: string;
  description: string;
}
export interface Property {
  id: string;
  building: string;
  type: 'Commercial' | 'Residential' | 'Retail' | 'Hotel' | 'Industrial' | 'Other';
  floorUnit: string;
  area: string;
  tenant: string;
  landlord: string;
  agent: string;
  company: string;
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
    { id: '1', building: 'Two IFC', type: 'Commercial', floorUnit: '88/F', area: '25,000 sqft', tenant: 'State Street', landlord: 'Henderson Land', agent: 'PrimeSpace', company: 'IFC Management', contacts: 'John Smith +852 2800 1234' },
    { id: '2', building: 'Pacific Place', type: 'Retail', floorUnit: 'L2 201', area: '1,200 sqft', tenant: 'Luxury Brand', landlord: 'Swire Properties', agent: 'PrimeSpace', company: 'Swire', contacts: 'M. Chen +852 2918 8888' },
  ],
  'commercial-sales': [
    { id: '3', building: 'The Center', type: 'Commercial', floorUnit: 'Whole 70/F', area: '24,000 sqft', tenant: 'Hedge Fund X', landlord: 'Consortium', agent: 'John Doe', company: 'HK Assets', contacts: 'A. Wong +852 3456 7890' },
  ],
  'industrial': [
    { id: '4', building: 'ATL Logistics Centre', type: 'Industrial', floorUnit: 'Block B, 4/F', area: '50,000 sqft', tenant: 'Logistics Pro', landlord: 'Goodman', agent: 'Jane Smith', company: 'ATL', contacts: 'K. Lee +852 2489 1000' },
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
    { id: 'v1', address: '12-14 Des Voeux Road Central', date: '2024-05-20', propertyType: 'Office', area: '15,000 sqft', valuationType: 'Mortgage', valuer: 'Cushman' },
  ],
  'sz': [
    { id: 'v2', address: 'Futian CBD Block 5', date: '2024-03-12', propertyType: 'Residential', area: '8,000 sqm', valuationType: 'Market Value', valuer: 'Colliers' },
  ]
};
// FIX: Compatibility exports for worker/entities.ts
export const MOCK_USERS: User[] = [];
export const MOCK_CHATS: Chat[] = [];
export const MOCK_CHAT_MESSAGES: ChatMessage[] = [];