export interface Profile {
  id: string;
  userId: string;
  isSitter: boolean;
  name?: string;
  description?: string;
  jobTitle?: string;
  gender?: 'male' | 'female' | 'other';
  address?: string;
  telephone?: string;
  birthday?: string;
  photo?: string;
  hourlyRate?: number;
  uploadedImages?: string[];
  averageRating?: number;
}
