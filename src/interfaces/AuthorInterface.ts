export interface AuthorInterface {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  profilePicture?: {
    url: string;
    key: string;
  };
}