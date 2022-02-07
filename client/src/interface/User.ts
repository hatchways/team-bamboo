export interface User {
  _id?: string;
  id?: string;
  name: string;
  email: string;
}

export interface SearchUsersApiData {
  users?: User[];
  error?: { message: string };
}
