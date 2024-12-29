export interface Task {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  completed?: boolean;
}
