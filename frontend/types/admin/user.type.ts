export interface User {
  id: string;
  clerkId: string;
  name: string;
  email: string;
  provider: string;
  profileUrl: string;
  role: "admin" | "user";
  isActive: boolean;
  created_at: string;
  updated_at: string;
}

export interface UsersResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
    users: User[];
  };
}
