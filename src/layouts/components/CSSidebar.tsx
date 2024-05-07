import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getTheme, Sidebar } from 'flowbite-react';
import { Chart, Envelope, UsersGroup, ChevronRight } from 'flowbite-react-icons/outline';
import { HiOutlineHome } from 'react-icons/hi';
import Icons, { CampaignIcon, NotificationIcon, SettingsIcon } from '@/assets/icons';
import profilePic from '@/assets/images/authentication/agency.png';
import logo from '@/assets/logo-title-black.svg';
import { useAuthStore } from '@/stores/authStore';
import { css, Global, useTheme } from '@emotion/react';
import { type CustomFlowbiteTheme } from 'flowbite-react';
import '@/styles/sidebar-styles.css';

interface CSSidebarProps {
  className?: string;
}

interface MyTheme {
  colors: {
    white: string;
  };
}

export const CSSidebar = ({ className }: CSSidebarProps) => {
  const [campaignSubMenuOpen, setCampaignSubMenuOpen] = useState(false);
  const theme = useTheme() as MyTheme;
  const location = useLocation();

  // this is here to check if path === either campaign sub menu to make sure the submenu state stays open when user interacts within the submenu of campaigns
  useEffect(() => {
    const campaignPaths = ['/active-campaigns', '/past-campaigns', '/applied-campaigns'];
    const isCampaignPath = campaignPaths.some((path) => location.pathname.includes(path));
    setCampaignSubMenuOpen(isCampaignPath);
  }, [location]);

  // this will check if current path name above is active to keep selected sub menu item highlighted
  const isActive = (path: string) => location.pathname === path;

  const sidebarTheme: CustomFlowbiteTheme['sidebar'] = getTheme().sidebar;

  const componentTheme: CustomFlowbiteTheme['sidebar'] = {
    ...sidebarTheme,
    item: {
      ...sidebarTheme.item,
      icon: {
        ...sidebarTheme.item?.icon,
        base: `${sidebarTheme.item?.icon?.base} text-gray-600`,
      },
    },
  };

  const userType = useAuthStore((state) => state.user?.userType);

  const menuItems = [
    { href: '/', icon: HiOutlineHome, label: 'Home' },
    { href: '#', icon: Icons.CompassIcon, label: 'Discover' },
    {
      href: '/active-campaigns',
      icon: CampaignIcon,
      label: 'Campaigns',
      campaignItems: [
        { href: '/active-campaigns', label: 'Active' },
        { href: '/past-campaigns', label: 'Past' },
        { href: '/applied-campaigns', label: 'Applied' },
      ],
    },
    { href: '#', icon: Envelope, label: 'Inbox' },
    { href: '#', icon: Icons.CalendarIcon, label: 'Calendar' },
    userType === 'Agency'
      ? { href: '#', icon: UsersGroup, label: 'Clients' }
      : { href: '#', icon: Icons.ClipboardListIcon, label: 'Tasks' },
    { href: '#', icon: Chart, label: 'Analytics' },
    userType === 'Creator'
      ? { href: '#', icon: Icons.DollarIcon, label: 'Earnings' }
      : { href: '#', icon: Icons.DollarIcon, label: 'Payments' },
  ];

  return (
    <>
      <Global
        styles={css`
          .cs-sidebar > div {
            background-color: ${theme.colors.white};
            width: 100%;
          }
          .sidebar-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
          }
        `}
      />
      <div className={`flex h-full flex-col ${className}`}>
        <Sidebar
          theme={componentTheme}
          className="cs-sidebar flex-grow"
        >
          <div className="mb-5 flex items-center">
            <a
              href="/"
              className="mb-5 flex items-center"
            >
              <img
                src={logo}
                alt="Logo"
                className="mr-3 h-12"
              />
            </a>
          </div>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              {menuItems.map((item) =>
                item.campaignItems ? (
                  <React.Fragment key={item.label}>
                    <Sidebar.Item
                      icon={item.icon}
                      onClick={() => {
                        setCampaignSubMenuOpen(!campaignSubMenuOpen);
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          cursor: 'pointer',
                        }}
                      >
                        {item.label}
                        <ChevronRight
                          className={`transition-transform ${campaignSubMenuOpen ? 'rotate-90' : ''}`}
                        />
                      </div>
                    </Sidebar.Item>
                    {campaignSubMenuOpen && (
                      <div className="pl-4">
                        {item.campaignItems.map((subIcampaignItem) => (
                          <Link
                            to={subIcampaignItem.href}
                            key={subIcampaignItem.label}
                            className={`campaign-item block p-2 ${isActive(subIcampaignItem.href) ? 'active-item' : ''}`}
                          >
                            {subIcampaignItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </React.Fragment>
                ) : (
                  <Sidebar.Item
                    key={item.label}
                    href={item.href}
                    icon={item.icon}
                  >
                    {item.label}
                  </Sidebar.Item>
                ),
              )}
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
        <div className="mt-auto flex w-full items-center justify-between p-4">
          <Link to="/profile">
            <img
              src={profilePic}
              alt="User"
              className="h-10 w-10 rounded-full border-4 border-blue-500"
            />
          </Link>
          <div className="flex">
            <NotificationIcon className="h-6 w-6 text-gray-600" />
            <SettingsIcon className="h-4 w-4 text-gray-600" />
          </div>
        </div>
      </div>
    </>
  );
};
