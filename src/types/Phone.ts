export interface Phone {
  id: number;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
}

export interface CartItem extends Phone {
  quantity: number;
}
