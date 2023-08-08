export type Post = {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  date: string;
  comments: [Comment];
};

export type Comment = {
  id: string;
  username: string;
  email: string;
  text: string;
};
