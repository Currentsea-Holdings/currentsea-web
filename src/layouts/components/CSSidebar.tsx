import { getTheme, Sidebar } from 'flowbite-react';
import { Chart, Envelope, UsersGroup } from 'flowbite-react-icons/outline';
import { HiOutlineHome } from 'react-icons/hi';
import { Link } from 'react-router-dom';

import Icons, { CampaignIcon, NotificationIcon, SettingsIcon } from '@/assets/icons';
import profilePic from '@/assets/images/authentication/agency.png';
import logo from '@/assets/logo-title-black.svg';
import { useAuthStore } from '@/stores/authStore';
import { css, Global, useTheme } from '@emotion/react';

import type { CustomFlowbiteTheme } from 'flowbite-react';
interface CSSidebarProps {
  // theme: {
  //   colors: {
  //     sidebar: string;
  //   };
  // },
  className?: string;
}

interface MyTheme {
  colors: {
    white: string;
  };
}

export const CSSidebar = ({ className, ...props }: CSSidebarProps) => {
  const theme = useTheme() as MyTheme; // Type assertion

  const sidebarTheme: CustomFlowbiteTheme['sidebar'] = getTheme().sidebar;

  const componentTheme: CustomFlowbiteTheme['sidebar'] = {
    ...sidebarTheme,
    item: {
      ...sidebarTheme.item,
      icon: {
        ...sidebarTheme.item?.icon,
        base: `${sidebarTheme.item?.icon?.base} text-gray-60`,
      },
    },
  };

  // const tw = (strings: TemplateStringsArray, ...values: string[]) => String.raw({ raw: strings }, ...values);

  const userType = useAuthStore((state) => state.user?.userType);

  const menuItems = [
    { href: '/', icon: HiOutlineHome, label: 'Home' },
    { href: '#', icon: Icons.CompassIcon, label: 'Discover' },
    { href: '#', icon: CampaignIcon, label: 'Campaigns' },
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
        `}
      />
      {/*------------------- */}
      <div className={`flex h-full flex-col ${className}`}>
        <Sidebar
          theme={componentTheme}
          // aria-label="Sidebar - Main navigation"
          //----------------------
          className="cs-sidebar flex-grow"
          {...props}
        >
          <div className="mb-5 flex items-center">
            <a
              className="mb-5 flex items-center"
              href="/"
            >
              <img
                src={logo}
                alt="Logo"
                className="mr-3 h-12"
              />
              <span className="align self-center whitespace-nowrap text-xl font-semibold dark:text-white"></span>
            </a>
          </div>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              {menuItems.map((item) => (
                <Sidebar.Item
                  className="text-left"
                  key={item.label}
                  href={item.href}
                  icon={item.icon}
                >
                  {item.label}
                </Sidebar.Item>
              ))}
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
        <div className="mt-auto flex w-full items-center justify-between p-4">
          {' '}
          {/* Added items-center to align items vertically */}
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
