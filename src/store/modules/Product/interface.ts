export default interface Product {
    id: number;
    name: string;
    picture_path: string;
    price: number;
    stock: number;
    product_type_details_id: number;
    store_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

// Define ApiResponse interface
export interface ApiResponse {
    data: Product[]; // Assuming the API response contains an array of Product objects
}
