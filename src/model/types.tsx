import { Product } from "./product/Products";
import { ItemDiscount } from "./bill/Bill";
export interface IUser{
    id?: string;
    docId?: string;
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
    lastActiveTime?: number;
    status?: number;
    sex?: boolean;
    codeDiscount?: ItemDiscount[];
}
interface Address{
    city?: string;
    district?: string;
    street?: string;
}
export interface Action {
    type: string,
    payload: any
}
export default class User implements IUser{
    id?: string;
    docId?: string;
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
    lastActiveTime?: number;
    status?: number;
    sex?: boolean;
    codeDiscount?: ItemDiscount[];
}