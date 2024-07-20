export type PregnancyGender = 'boy' | 'girl' | 'unknown';

interface Baby {
  gender: string;
}

export interface Pregnancy {
  id: number;
  date_of_term: string
  babies: Baby[];
  daysLeft: number
}

export interface PregnancyForm {
  dateOfTerm: string;
  babies: Baby[];
}