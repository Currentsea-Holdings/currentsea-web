export type Account = {
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  created_at: Date;
  updated_at: Date;
};

export interface User {
  followers: number;
  following: number;
  location: string;
  description: string;
  socialLinks: { [key: string]: string };
  created_at: Date;
  updated_at: Date;
}

export interface Creator extends User {
  tags: string[];
  pastClients: string[];
}

export interface Brand extends User {}

export interface Agency extends User {
  tags: string[];
  pastClients: string[];
  rates: number;
}
