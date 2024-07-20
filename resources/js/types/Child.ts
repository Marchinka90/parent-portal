export type ChildrenGender = 'boy' | 'girl';

export interface Child {
  id: number;
  user_id: number
  name: string;
  gender: string;
  date_of_birth: string;
  age: { years: number, months: number };
}

export interface ChildrenForm {
  name: string;
  gender: string;
  dateOfBirth: string;
}