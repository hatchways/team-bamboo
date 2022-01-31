export interface Profile {
  _id: string;
  coverPhoto: string;
  photo: string;
  uploadedImages: string[];
  name: string;
  description: string;
  hourlyRate: number;
  address: string;
  averageRating: number;
  jobTitle: string;
  userId: string;
}
