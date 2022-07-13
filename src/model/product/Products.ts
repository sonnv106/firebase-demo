export interface Product{
    id: string;
    name: string;
    unit: string;
    ingredients?: string; // thành phần
    mfg?: number;  // ngày sản xuất
    exp?: number;   // ngày hết hạn
    preserve?: string; // bảo quản
    source?: string; //nguồn nhập hàng từ công ty nào
    certificate?: string; // chứng chỉ
    warning?: string; // cảnh báo
    origin?: string; // xuất xứ
    detail?: string; //mô tả
    category?: string; // danh mục sản phẩm
    urls?: string[];
    distributors?: Distributor[]; // nhà phân phối
    variants?: Variant[];  // biến thể sản phẩm
    display?: boolean; // hiển thị hay không
}
export interface Variant{
    name?: string;
    import_price?: number; // giá nhập
    price?: number; // giá bán
    amount?: number;
    packing?: string;
    size?: string; // kích thước
    smell?: string; //mùi vị
    color?: string;  //màu sắc
    urls?: string[];
}
interface Distributor{
    id: string;
    name: string;
    phone?: string;
    address?: string;
    saleStaffs?: SaleStaff[];
    workingDay: DayOfWeek;
}
interface SaleStaff{
    id?: string;
    name?: string;
    phone?: string;
    distributor?: string;
    workingday?: DayOfWeek;
}
type DayOfWeek = 'Thứ hai' | 'Thứ ba' | 'Thứ tư' | 'Thứ năm' | 'Thứ sáu' | 'Thứ bảy' | 'Chủ nhật' | 'Cả tuần';

