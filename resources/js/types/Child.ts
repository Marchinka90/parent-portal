export interface Child {
  id: number;
  user_id: number
  name: string;
  gender: 'boy' | 'girl';
  date_of_birth: string;
  age: { years: number, months: number };
}