export interface RootState {
  sidebarShow: boolean;
}

export interface BasicModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface DefineItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: UnmappedItemTableData | undefined;
}

export type MenuItem = {
  key: React.Key;
  label: React.ReactNode;
  icon?: React.ReactNode;
  path?: string;
  children?: MenuItem[];
};

export type EcomUploadFileIsLoading = {
  TIK: boolean;
  TOK: boolean;
  SHO: boolean;
  LAZ: boolean;
};

export interface UnmappedItemTableData {
  item_id: number;
  item_name: string;
  ecom_code: number;
  is_excluded: number;
}

export interface PicklistItem {
  item_id: number;
  item_name: string;
  is_excluded: number;
}

export interface PicklistItemDisplayTableData {
  stock_id: React.Key;
  product_type: string;
  product_color: string;
  product_size: string;
  count: number;
  items: {
    [key: string]: PicklistItem[] | [];
  };
}
