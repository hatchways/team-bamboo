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
  birthday: string | null;
  photo?: string;
  hourlyRate?: number;
  uploadedImages?: string[];
  averageRating?: number;
}

export interface SitterProfile extends Profile {
  isSitter: true;
  hourlyRate: number;
}
export interface GetSitterProfileParams {
  limit?: number;
  page?: number;
  location?: string;
  start?: string;
  end?: string;
}
export interface GetSitterProfiles {
  profiles: SitterProfile[];
}
