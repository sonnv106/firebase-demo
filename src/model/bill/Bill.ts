import { User } from "../user/User";
import { Product } from "../product/Products";

export interface Bill{
    id: string;
    created_at?: number;
    user: User;
    products: Product[]; // danh sách hàng hóa 
    totalAmount: number; // tổng tiền hàng
    transportFee?: number; // phí vận chuyển
    total: number; // tổng tiền
    payment_type?: number; // phương thức thanh toán  0: tiền mặt, 1: chuyển khoản
    payment_status?: number; // trạng thái thanh toán 0: Chưa thanh toán, 1: Đã thanh toán
    bill_status: BillStatus;
    transporter?: Transporter;  
    start_at?: number;
    finish_at?: number;
    feedback?: string;
    discount?: ItemDiscount;
}
interface Transporter{
    id?: string;
    name?: string;
    phone?: string;
    license?: string;
} 
enum BillStatus {
    WAITING_TO_CONFIRM = 0,
    WATING_FOR_THE_GOODS = 1,
    IS_DELIVERING = 2,
    IS_RECEIVED = 3,
    IS_CANCELED = 4,
}
export interface Discount{
    id?: string;
    discountMoney: number;
    exp: number;
    mfg: number;
    use_status: boolean;
    amount: number
}
interface ItemDiscount{
    id?: string;
    discountMoney: number;
    exp: number;
    mfg: number;
    use_status: boolean;
}