import { User } from "../user/User";
import { Product } from "../product/Products";
export interface Bill{
    id: string;
    created_at: number;
    user: User;
    products: Product[]; // danh sách hàng hóa 
    payment_type: number; // phương thức thanh toán  0: tiền mặt, 1: chuyển khoản
    payment_status: number; // trạng thái thanh toán 0: Chưa thanh toán, 1: Đã thanh toán
    totalAmount: number; // tổng tiền hàng
    transportFee: number; // phí vận chuyển
    total: number; // tổng tiền

}
