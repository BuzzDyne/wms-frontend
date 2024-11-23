export interface RootState {
  sidebarShow: boolean;
}

export type MenuItem = {
  key: React.Key;
  label: React.ReactNode;
  icon?: React.ReactNode;
  path?: string;
  children?: MenuItem[];
};
