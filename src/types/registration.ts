export interface Registration {
  id: number;
  name: string;
  age: number;
  area: string;
  status: string;
  date: string;
  email: string;
  contact: string;
  address: string;
  personalInfo?: {
    [key: string]: string;
  };
  nextOfKin?: {
    [key: string]: string;
  };
  spouses?: Array<{
    name: string;
    dateOfBirth: string;
  }>;
  dependants?: Array<{
    name: string;
    dateOfBirth: string;
    gender: string;
    category: string;
  }>;
}