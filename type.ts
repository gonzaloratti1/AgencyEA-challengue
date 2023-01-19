export interface Category{
    id: number,
    name: string,
    sublevels?: Category[],
}

export interface Product {
    quantity:    number;
    price:       string;
    available:   boolean;
    sublevel_id: number;
    name:        string;
    id:          string;
  }