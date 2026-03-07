export interface UserProfile {
  id: number;
  username: string;
  name: string; // Ou string | null se o backend puder retornar nulo
  email: string;
  bio: string;
  profilePictureUrl: string;
  dateOfBirth: string; // ISO String (Ex: "2004-04-27")
  age: number;
  followersCount: number;
  followingCount: number;
  postsCount: number;
}
export interface EditUserProfile {
  id?: number;
  username?: string;
  name?: string; 
  email?: string;
  bio?: string;
  profilePictureUrl?: string;
  dateOfBirth?: string;
  age?: number;
  followersCount?: number;
  followingCount?: number;
  postsCount?: number;
}