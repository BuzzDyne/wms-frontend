import { Drawer, Layout, Menu, MenuProps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useLocation } from "react-router-dom";
import { MenuItem, RootState } from "../../models/types";
import {
  defaultNavItems,
  ecomNavItems,
  ownerNavItems,
  packNavItems,
  wareNavItems,
} from "../../configs/navsConfig";
import useAuth from "../../hooks/useAuth";

const { Sider } = Layout;

const AppSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const sidebarShow = useSelector((state: RootState) => state.sidebarShow);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const { auth } = useAuth();
  const userRoleId = (auth.token_role_id ?? 0) as 0 | 1 | 2 | 3 | 4;

  const roleToNavItems: { [key in 0 | 1 | 2 | 3 | 4]: MenuItem[] } = {
    0: defaultNavItems,
    1: ownerNavItems,
    2: wareNavItems,
    3: ecomNavItems,
    4: packNavItems,
  };

  const navItems = roleToNavItems[userRoleId];

  const handleCloseNavbar = () => {
    dispatch({ type: "set", sidebarShow: !sidebarShow });
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    const clickedItem = findMenuItemByKey(navItems, e.key);
    if (clickedItem?.path) {
      navigate(clickedItem.path);
      if (isMobile) {
        handleCloseNavbar();
      }
    }
  };

  const findMenuItemByKey = (
    items: MenuItem[],
    key: string
  ): MenuItem | undefined => {
    for (const item of items) {
      if (item.key === key) return item;
      if (item.children) {
        const found = findMenuItemByKey(item.children, key);
        if (found) return found;
      }
    }
    return undefined;
  };

  const getSelectedKeys = () => {
    const currentPath = location.pathname;
    const selectedItem = findMenuItemByPath(navItems, currentPath);
    return selectedItem ? [String(selectedItem.key)] : [];
  };

  // Helper function to find menu item by path
  const findMenuItemByPath = (
    items: MenuItem[],
    path: string
  ): MenuItem | undefined => {
    for (const item of items) {
      if (item.path === path) return item;
      if (item.children) {
        const found = findMenuItemByPath(item.children, path);
        if (found) return found;
      }
    }
    return undefined;
  };

  return (
    <>
      {!isMobile && (
        <Sider
          collapsed={sidebarShow}
          width={200}
          style={{ position: "relative", zIndex: 2 }}
        >
          <div style={{ height: "100px" }} />
          <Menu
            theme="dark"
            selectedKeys={getSelectedKeys()}
            mode="inline"
            items={navItems}
            onClick={handleMenuClick}
          />
        </Sider>
      )}

      {isMobile && (
        <Drawer
          placement="left"
          onClose={handleCloseNavbar}
          open={!sidebarShow}
          styles={{
            body: { padding: 0, backgroundColor: "#001529" },
            header: { backgroundColor: "#001529", color: "white" },
          }}
        >
          <Menu
            theme="dark"
            selectedKeys={getSelectedKeys()}
            mode="inline"
            items={navItems}
            onClick={handleMenuClick}
          />
        </Drawer>
      )}
    </>
  );
};

export default AppSidebar;
