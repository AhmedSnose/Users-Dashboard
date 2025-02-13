export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface userResponseType {
  data: User[];
  page: number;
  per_page: number;
  total_pages: number;
  total: number;
}
