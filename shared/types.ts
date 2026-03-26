export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export type DimensionType = 'department' | 'assets';
export interface GlobalContact {
  id: string;
  firstName: string;
  lastName: string;
  chineseName: string;
  email: string;
  phone1: string;
  role: string;
  category: 'Tenant' | 'Landlord' | 'Legal' | 'Agency';
}
export interface User {
  id: string;
  name: string;
}
export interface Chat {
  id: string;
  title: string;
}
export interface ChatMessage {
  id: string;
  chatId: string;
  userId: string;
  text: string;
  ts: number;
}