export interface IRequest {
  name: string;
  status: string;
  deadline: string;
  userId: string;
}

export interface IRequestResponse {
  id: string;
  name: string;
  status: string;
  deadline: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface IRequestUpdate {
  name?: string;
  status?: string;
  deadline?: string;
}
