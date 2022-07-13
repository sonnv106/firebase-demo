import { Product } from "../product/Products";
import { ItemDiscount } from "../bill/Bill";
export interface User{
    id: string;
    email: string;
    password?: string;
    isAdmin?: boolean;
    active?: boolean;
    name?: string;
    phone?: string;
    avatar?: string;
    address?: Address;
    favoriteProduct?: Product[];
    token?: string;
    created_at?: number;
    updated_at?: number;
    dateOfBirth?: number;
    sex?: boolean;
    codeDiscount: ItemDiscount[];
}
interface Address{
    city?: string;
    district?: string;
    street?: string;
}
