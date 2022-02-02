export interface ImgUrlSchema {
  _id: string;
  filePath: string;
}

export interface Profile {
  _id: string;
  coverPhoto: string;
  photo: string;
  uploadedImages: ImgUrlSchema[];
  name: string;
  description: string;
  hourlyRate: number;
  address: string;
  jobTitle: string;
  userId: string;
}
