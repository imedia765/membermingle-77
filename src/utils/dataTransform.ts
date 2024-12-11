import { generateMemberNumber } from './memberNumbering';

interface RawMember {
  address: string;
  collector: string;
  dateOfBirth: string | number;
  dependants: any;
  email: string;
  fullName: string | number;
  gender: string | number;
  maritalStatus: string | number;
  membershipInfo: string | number;
  mobileNo: string | number;
  name: string;
  nextOfKinAddress: string | number;
  nextOfKinName: string | number;
  nextOfKinPhone: string | number;
  notes: any;
  oldMemberNumber: string | null;
  payments: any;
  placeOfBirth: string | number;
  postCode: string | number;
  role: string;
  spouses: any;
  town: string | number;
  verified: boolean;
}

interface CleanMember {
  memberNumber: string;
  address: string;
  collector: string;
  dateOfBirth: string;
  dependants: any[];
  email: string;
  fullName: string;
  gender: string;
  maritalStatus: string;
  membershipInfo: string;
  mobileNo: string;
  name: string;
  nextOfKinAddress: string;
  nextOfKinName: string;
  nextOfKinPhone: string;
  notes: any[];
  oldMemberNumber: string | null;
  payments: any[];
  placeOfBirth: string;
  postCode: string;
  role: string;
  spouses: any[];
  town: string;
  verified: boolean;
}

const cleanValue = (value: any): string => {
  if (value === 0 || value === null || value === undefined) return '';
  return String(value);
};

const cleanArray = (value: any): any[] => {
  if (Array.isArray(value)) return value;
  if (value === 0 || value === null || value === undefined) return [];
  return [];
};

export const transformMemberData = (members: RawMember[]): CleanMember[] => {
  const collectorCounts: { [key: string]: number } = {};
  
  return members.map((member) => {
    // Increment counter for this collector
    collectorCounts[member.collector] = (collectorCounts[member.collector] || 0) + 1;
    
    // Generate new member number
    const memberNumber = generateMemberNumber(member.collector, collectorCounts[member.collector]);

    return {
      memberNumber,
      address: cleanValue(member.address),
      collector: member.collector,
      dateOfBirth: cleanValue(member.dateOfBirth),
      dependants: cleanArray(member.dependants),
      email: cleanValue(member.email),
      fullName: cleanValue(member.fullName || member.name),
      gender: cleanValue(member.gender),
      maritalStatus: cleanValue(member.maritalStatus),
      membershipInfo: cleanValue(member.membershipInfo),
      mobileNo: cleanValue(member.mobileNo),
      name: member.name,
      nextOfKinAddress: cleanValue(member.nextOfKinAddress),
      nextOfKinName: cleanValue(member.nextOfKinName),
      nextOfKinPhone: cleanValue(member.nextOfKinPhone),
      notes: cleanArray(member.notes),
      oldMemberNumber: member.oldMemberNumber,
      payments: cleanArray(member.payments),
      placeOfBirth: cleanValue(member.placeOfBirth),
      postCode: cleanValue(member.postCode),
      role: member.role,
      spouses: cleanArray(member.spouses),
      town: cleanValue(member.town),
      verified: member.verified
    };
  });
};
