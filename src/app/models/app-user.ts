export class AppUser {
  name: string;
  email?: string;
  password?: string;
  admin: boolean = true;

  constructor(name: string, isAdmin: boolean) {
    this.name = name;
    this.admin = isAdmin;
  }
}

export interface AuthResponse {
  currentUser: string;
  accessToken: string;
  cartId: string;
}
