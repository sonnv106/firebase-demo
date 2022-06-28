enum Size {
    small, 
    medium,
    large,
}

interface Product {
    name: string,
    ingredients?: string,
    preserve?: string,
    source?:string,
    certificate?: string,
    warning?:string,
    origin?: string,
    detail?: string,
    category?:string,
    image?:  [],
    size?: Size
}
export {
    Product
}