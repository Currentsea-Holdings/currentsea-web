import classNames from 'classnames';
import { getTheme, Sidebar } from 'flowbite-react';
import { Chart, ChevronRight, Envelope, UsersGroup } from 'flowbite-react-icons/outline';
import { useEffect, useState } from 'react';
import { HiOutlineHome } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';

import Icons, { CampaignIcon, NotificationIcon, SettingsIcon } from '@/assets/icons';
import profilePic from '@/assets/images/authentication/agency.png';
import logo from '@/assets/logo-title-black.svg';
import { useAuthStore } from '@/stores/authStore';
import { css, Global, useTheme } from '@emotion/react';

import type { CustomFlowbiteTheme } from 'flowbite-react';
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
  const isActive = (path: string) => activeItem === path;

  const isCampaignActive = () => {
    const campaignPaths = ['/active-campaigns', '/past-campaigns', '/applied-campaigns'];
    return campaignPaths.some((path) => location.pathname.includes(path));
  };

  const [activeItem, setActiveItem] = useState(location.pathname);

  const sidebarTheme: CustomFlowbiteTheme['sidebar'] = getTheme().sidebar;

  const componentTheme: CustomFlowbiteTheme['sidebar'] = {
    ...sidebarTheme,
    item: {
      ...sidebarTheme.item,
      base: `${sidebarTheme.item?.base} hover:text-primary font-semibold text-gray-60`,
      active: `${sidebarTheme.item?.active} text-primary bg-gray-100`,
      icon: {
        ...sidebarTheme.item?.icon,
        base: `${sidebarTheme.item?.icon?.base} text-gray-600`,
      },
    },
  };

  const userType = useAuthStore((state) => state.user?.userType);

  const menuItems = [
    { to: '/', icon: HiOutlineHome, label: 'Home' },
    { to: '#', icon: Icons.CompassIcon, label: 'Discover' },
    {
      to: '/active-campaigns',
      icon: CampaignIcon,
      label: 'Campaigns',
      campaignItems: [
        { to: '/active-campaigns', label: 'Active' },
        { to: '/past-campaigns', label: 'Past' },
        { to: '/applied-campaigns', label: 'Applied' },
      ],
    },
    { to: '#', icon: Envelope, label: 'Inbox' },
    { to: '#', icon: Icons.CalendarIcon, label: 'Calendar' },
    userType === 'Agency'
      ? { to: '#', icon: UsersGroup, label: 'Clients' }
      : { to: '#', icon: Icons.ClipboardListIcon, label: 'Tasks' },
    { to: '#', icon: Chart, label: 'Analytics' },
    userType === 'Creator'
      ? { to: '#', icon: Icons.DollarIcon, label: 'Earnings' }
      : { to: '#', icon: Icons.DollarIcon, label: 'Payments' },
  ];

  return (
    <>
      <Global
        styles={css`
          .cs-sidebar > div {
            background-color: ${theme.colors.white};
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
            <Link
              to="/"
              className="mb-5 flex items-center"
            >
              <img
                src={logo}
                alt="Logo"
                className="mr-3 h-12"
              />
            </Link>
          </div>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              {menuItems.map((item) =>
                item.campaignItems ? (
                  <div
                    key={item.label}
                    onMouseEnter={() => {
                      setCampaignSubMenuOpen(true);
                    }}
                    onMouseLeave={() => {
                      !isCampaignActive() && setCampaignSubMenuOpen(false);
                    }}
                  >
                    <Sidebar.Item
                      onClick={() => {
                        !isCampaignActive() && setActiveItem(item.label);
                      }}
                      icon={item.icon}
                      active={isCampaignActive()}
                    >
                      <div className="flex cursor-default justify-between">
                        {item.label}
                        <ChevronRight
                          className={`transition-transform ${campaignSubMenuOpen ? 'rotate-90' : ''}`}
                        />
                      </div>
                    </Sidebar.Item>
                    <div className={`mt-2 pl-4 ${campaignSubMenuOpen ? 'block' : 'hidden'}`}>
                      <div className={`pl-4 ${campaignSubMenuOpen ? '' : 'hidden'}`}>
                        {item.campaignItems.map((subItem) => (
                          <Link
                            to={subItem.to}
                            key={subItem.label}
                            className={classNames(
                              'block rounded-lg p-2 text-dark hover:bg-gray-10 hover:text-primary',
                              { 'font-semibold text-primary': isActive(subItem.to) },
                            )}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Sidebar.Item
                    key={item.label}
                    as={Link}
                    to={item.to}
                    icon={item.icon}
                    className={classNames({ 'cursor-not-allowed': item.to === '#' })}
                    active={isActive(item.to)}
                    onClick={() => {
                      item.to !== '#' && setActiveItem(item.to);
                    }}
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
