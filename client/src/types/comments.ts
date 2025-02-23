export interface CommentInterface {
  post: string;
  content: string;
  parentComment?: string;
  _id?: string;
  author?: {
    username: string;
  };
}
