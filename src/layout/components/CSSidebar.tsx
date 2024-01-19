import { Sidebar } from 'flowbite-react';
import {
  HiOutlineHome,
  HiInbox,
  HiTable,
  HiViewBoards,
} from 'react-icons/hi';
import { IconType } from 'react-icons/lib';
import logo from '@/assets/logo-title-black.svg';
import { useTheme, Global, css } from '@emotion/react';
import { InboxIcon, CalendarIcon, ClipboardListIcon, AffiliateProgramIcon } from '@/assets/icons';

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

  // const tw = (strings: TemplateStringsArray, ...values: string[]) => String.raw({ raw: strings }, ...values);

  const menuItems = [
    { href: '#', icon: HiOutlineHome, label: 'Home' },
    { href: '#', icon: HiViewBoards, label: 'Discover' },
    { href: '#', icon: HiInbox, label: 'Campaigns' },
    { href: '#', icon: InboxIcon, label: 'Inbox' },
    { href: '#', icon: CalendarIcon, label: 'Calendar' },
    { href: '#', icon: ClipboardListIcon, label: 'Tasks' },
    { href: '#', icon: AffiliateProgramIcon, label: 'Affiliate Program' },
    { href: '#', icon: HiTable, label: 'Payments' },
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
        // aria-label="Sidebar with logo branding example"
        className={`flex items-center my-sidebar-class h-auto ${className}`}
        {...props}
        >
        {/* Custom Logo with direct control over the img tag */}
        <div className="flex items-center mb-5">
          <a
            className="flex items-center mb-5"
            href="/"
          >
            <img
              src={logo}
              alt="Logo"
              className="h-12 mr-3" // Tailwind class for 50px height applied directly to the image
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
                icon={item.icon as IconType}
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
