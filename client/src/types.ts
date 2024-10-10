export type Todo = {
  name: string;
  body: string;
  expires: string;
  userid: string;
  statusid: string;
  id: string;
};

export type Status = {
  todos: Todo[];
  id: string;
  userid: string;
  projectid: string;
  name: string;
};

export type Project = {
  id: string;
  userid: string;
  name: string;
  statuses: Status[];
};

export type Data = {
  projects: Project[];
  username: string;
  userId: string;
  session: boolean;
};

export type SearchParams = {
  newproject?: true;
  create?: true;
  search?: true;
  logout?: true;
  id?: string;
  settings?: true;
  error?: string;
  edit?: true;
  editstatus?: string;
  edittodo?: string;
};
