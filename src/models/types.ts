export interface RootState {
  sidebarShow: boolean;
}

export interface BasicModalProps {
  isOpen: boolean;
  onClose: () => void;
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
