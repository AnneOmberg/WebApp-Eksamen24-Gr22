export type HappeningType = {
  id: string;
  slug: string;
  title: string;
  date: string;
  description: string;
  location: string;
  category: string;
  seats: string;
  price: string;
  status: string;
};

export type PersonType = {
  id: string;
  name: string;
  email: string;
};

export type FormType = {
  id: string;
  title: string;
  persons: PersonType[];
};
