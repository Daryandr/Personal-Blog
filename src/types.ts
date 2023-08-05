export type Post = {
  id: string;
  title: string;
  shortDescroption: string;
  description: string;
  date: Date;
  comments: [Comment];
};

export type Comment = {
  id: string;
  username: string;
  email: string;
  text: string;
};
