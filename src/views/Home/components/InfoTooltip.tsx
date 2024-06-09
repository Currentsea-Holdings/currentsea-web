import type { CustomFlowbiteTheme } from 'flowbite-react';
import { getTheme, Tooltip } from 'flowbite-react';
import { InfoCircle } from 'flowbite-react-icons/solid';

interface InfoTooltipProps extends React.ComponentProps<typeof Tooltip> {
  content: string;
  size?: number;
  className?: string;
}

export const InfoTooltip = ({ content, size = 16, className, ...props }: InfoTooltipProps) => {
  return (
    <Tooltip
      theme={tooltipTheme}
      content={content}
      style="light"
      {...props}
    >
      <InfoCircle
        size={size}
        className={`${className} text-gray-50`}
      />
    </Tooltip>
  );
};

const tooltipTheme: CustomFlowbiteTheme['tooltip'] = {
  ...getTheme().tooltip,
  target: `${getTheme().tooltip.target} h-min`,
  arrow: {
    base: `${getTheme().tooltip.arrow.base} ml-2`,
    style: {
      light: 'bg-gray-20',
    },
  },
  base: `${getTheme().tooltip.base} w-64`,
  style: {
    light: 'bg-gray-20 text-dark',
    dark: 'bg-gray-20 text-dark',
  },
  content: `${getTheme().tooltip.content} text-center`,
};
