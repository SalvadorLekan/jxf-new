interface IParams {
  shop: string;
  product: string;
}

interface ShopItem {
  id: number;
  productName: string;
  productPrice: number;
  productDescription: string;
  productSlug: string;
  productMedia: string[];
  isQuantityLimited: boolean;
}

interface ShopData {
  id: number;
  storeName: string;
  storeCurrency: string;
  storeSlug: string;
  welcomeMessage: string;
  contact: {
    whatsapp: string;
    phoneNumber: string;
    email: string;
  };
  socialMedia?: { [key: string]: string };
  business: {
    businessId: number;
    businessDescription: string;
    businessName: string;
  };
  products: ShopItem[];
}

interface Shop {
  status: boolean;
  message: string;
  data?: ShopData;
}

interface AddToCart {
  item: ShopItem;
  number: number;
  shopSlug: string;
}

interface RemoveFromCart {
  item: ShopItem;
  shopSlug: string;
}

type CartItems = Record<
  string,
  Record<string, { item: ShopItem; amount: number }>
>;

type OrderStatus = "initial" | "pending" | "failure" | "success" | "partial";

interface OrderToServer {
  customerEmail: string;
  customerName: string;
  orderAmount: number;
  orderQuantity: number;
  storeId: number;
  productId: number;
  businessId: number;
}

interface OrderItemResponse {
  ref: string;
  status: boolean;
  message: string;
}

interface OrderResponse {
  status: boolean;
  message: string;
  data:
    | OrderItemResponse[]
    | { failed: OrderItemResponse[]; passed: OrderItemResponse[] };
}
