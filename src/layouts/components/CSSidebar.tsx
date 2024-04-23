import Icons from '@/assets/icons';
import logo from '@/assets/logo-title-black.svg';
import { Global, css, useTheme } from '@emotion/react';
import type { CustomFlowbiteTheme } from 'flowbite-react';
import { Sidebar, getTheme } from 'flowbite-react';
import { HiInbox, HiOutlineHome } from 'react-icons/hi';

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
            background-color: ${theme.colors.white};
            width: 100%;
          }
        `}
      />
      <Sidebar
        theme={componentTheme}
        // aria-label="Sidebar - Main navigation"
        className={`flex items-center my-sidebar-class h-auto ${className}`}
        {...props}
      >
        <div className="flex items-center mb-5">
          <a
            className="flex items-center mb-5"
            href="/"
          >
            <img
              src={logo}
              alt="Logo"
              className="h-12 mr-3"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap align dark:text-white"></span>
          </a>
        </div>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            {menuItems.map((item) => (
              <Sidebar.Item
                className="text-left"
                key={item.label}
                href={item.href}
                // icon={item.icon as IconType}
                icon={item.icon}
              >
                {item.label}
              </Sidebar.Item>
            ))}
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </>
  );
};
