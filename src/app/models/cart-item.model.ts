export interface CartItem {
drink: string|undefined;
pieces: any;
volume_ml: any;
 id: number;
 cart_id: number;
 category: string;
 item_id: number;
 quantity: number;
 price: string;
 subtotal: string | null;
 ingredients: number[] | null;
 created_at: string;
 updated_at: string;
 pizza_name?: string;
 crust_type?: string;
 size_cm?: number;
 image_url: string;
 name?: string;
}