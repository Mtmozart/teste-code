export type TCandidate = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  age: number;
  about: string;
  experience: string;
  curriculum?: string;
  formation: string;
  created_at?: Date;
  updated_at?: Date;

  error?: string;
};

export type TCandidateContactInfo = {
  id: number;
  phone: string;
  address: string;
  created_at?: Date;
  updated_at?: Date;
};

export type TCandidateEducation = {
  id: number;
  formation: string;
  experience: string;
  curriculum: string;
  created_at?: Date;
  updated_at?: Date;
};