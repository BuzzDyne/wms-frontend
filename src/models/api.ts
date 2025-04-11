export interface JwtDecoded {
  sub: string; // Username
  iat: number; // Issued at timestamp (in seconds)
  nbf: number; // Not before timestamp (in seconds)
  jti: string; // Unique token identifier
  exp: number; // Expiry timestamp (in seconds)
  type: string; // Token type (e.g., "access")
  fresh: boolean; // Whether the token is fresh
  role_id: number; // Role ID of the user
  user_id: number; // User ID
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export interface Picklist {
  id: number;
  draft_create_dt: string;
  draft_cancel_dt: string | null;
  creation_dt: string;
  pick_start_dt: string;
  completion_dt: string;
  picklist_status: string;
}

export interface GetListPicklistResponse {
  msg: string;
  data: Picklist[];
  page: number;
  size: number;
  total: number;
}

export interface CreatePicklistResponse {
  msg: string;
  data: Picklist;
}

interface Item {
  item_id: number;
  item_name: string;
  is_excluded: number;
  ecom_order_id: string;
}

interface Stock {
  stock_id: number;
  product_type: string;
  product_color: string;
  product_size: string;
  count: number;
  items: Record<string, Item[]>; // Dictionary to map platforms to lists of items
}

interface UnmappedItem {
  item_id: number;
  item_name: string;
  ecom_code: number;
  is_excluded: number;
}

export interface PicklistDashboardResponse {
  tik_file_id?: number | null;
  tok_file_id?: number | null;
  sho_file_id?: number | null;
  laz_file_id?: number | null;
  stocks: Stock[];
  unmapped_items: UnmappedItem[];
}

export interface TypeStockItemResponse {
  id: number;
  type_name: string;
  type_value: string;
  is_active: number;
}

export interface SizeStockItemResponse {
  id: number;
  size_name: string;
  size_value: string;
  is_active: number;
}

export interface ColorStockItemResponse {
  id: number;
  color_name: string;
  color_hex: string;
  is_active: number;
}

export interface CreateStockColorRequest {
  color_name: string;
  color_hex: string;
}

export interface CreateStockTypeRequest {
  type_name: string;
}
export interface CreateStockSizeRequest {
  size_name_start: string;
  size_name_end?: string; // Made optional
}
