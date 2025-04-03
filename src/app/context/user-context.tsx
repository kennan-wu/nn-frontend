interface User {
  id: string;
  name: string;
  email: string;
  nnMetadatas: any[];
}

interface UserContextType {
  user: User | null;
}
