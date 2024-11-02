import { TCandidate } from "../../src/types/cadidate";

export const REGISTER_MOCK = {
  name: 'John Doe',
  email: 'test@test.com',
  phone: '123456789',
  address: '1234 Test St',
  age: 25,
  about: 'I am a test',
  experience: 'I have experience in testing',
  formation: 'I have a degree in testing',
  curriculum: 'I have a curriculum',
  password: '12345678'
};

export const INVALID_REGISTER_MOCK = {
  name: 'John Doe',
  email: 'test@test.com',
  phone: '123456789',
};

export const INVALID_REGISTER_MOCK_EMAIL = {
  name: 'John Doe',
  email: 'joao.silva@example.com',
  phone: '123456789',
  address: '1234 Test St',
  age: 25,
  about: 'I am a test',
  experience: 'I have experience in testing',
  formation: 'I have a degree in testing',
  curriculum: 'I have a curriculum',
  password: '12345678'
};

export const REGISTER_MOCK_TO_DELETE = {
  name: 'John Doe',
  email: 'test1@test.com',
  phone: '123456789',
  address: '1234 Test St',
  age: 25,
  about: 'I am a test',
  experience: 'I have experience in testing',
  formation: 'I have a degree in testing',
  curriculum: 'I have a curriculum',
  password: '12345678'
};


export const UPDATE_MOCK: TCandidate = {
  id: 1, // ID fictício para o mock
  name: 'John Doe',
  email: 'test@test.com',
  phone: '123456789',
  address: '1234 Test St',
  password: '12345678',
  age: 25,
  about: 'I am a test',
  experience: 'I have experience in testing',
  curriculum: 'I have a curriculum',
  formation: 'I have a degree in testing',
  created_at: new Date(), 
  updated_at: new Date(), 
  isDeleted: false, 
  error: '', 
};
