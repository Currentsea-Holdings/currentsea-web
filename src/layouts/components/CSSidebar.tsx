/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import Icons, { NotificationIcon, SettingsIcon } from '@/assets/icons';
import profilePic from '@/assets/images/authentication/agency.png';
import logo from '@/assets/logo-title-black.svg';

import { Global, css, useTheme } from '@emotion/react';
import type { CustomFlowbiteTheme } from 'flowbite-react';
import { Sidebar, getTheme } from 'flowbite-react';
import { HiInbox, HiOutlineHome } from 'react-icons/hi';
import type { IconType } from 'react-icons/lib';
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

  const menuItems = [
    { href: '#', icon: HiOutlineHome, label: 'Home' },
    { href: '#', icon: Icons.CompassIcon, label: 'Discover' },
    { href: '#', icon: HiInbox, label: 'Campaigns' },
    { href: '#', icon: Icons.InboxIcon, label: 'Inbox' },
    { href: '#', icon: Icons.CalendarIcon, label: 'Calendar' },
    { href: '#', icon: Icons.ClipboardListIcon, label: 'Tasks' },
    { href: '#', icon: Icons.AffiliateProgramIcon, label: 'Affiliate Program' },
    { href: '#', icon: Icons.DollarIcon, label: 'Payments' },
  ];
  return (
    <>
      <Global
        styles={css`
          .my-sidebar-class > div {
            background-color: ${theme.colors};
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
          className="flex-grow"
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
                  icon={item.icon as IconType}
                >
                  {item.label}
                </Sidebar.Item>
              ))}
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
        <div className="mt-auto flex w-full justify-between p-4 items-center"> {/* Added items-center to align items vertically */}
        <img src={profilePic} alt="User" className="h-10 w-10 rounded-full border-4 border-blue-500" />
        <div className="flex">
          <NotificationIcon className="h-6 w-6 text-gray-600" />
          <SettingsIcon className="h-4 w-4 text-gray-600" />
        </div>
      </div>
      </div>
    </>
  );
};
