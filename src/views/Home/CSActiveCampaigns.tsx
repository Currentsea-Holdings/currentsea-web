import type { CustomFlowbiteTheme} from 'flowbite-react';
import { getTheme } from 'flowbite-react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import type { FC } from 'react';
import { CSCard } from '@/components/common';
import { CSActiveCampaignsCard } from '@/views/Home/CSActiveCampaignsCard';

export const CSActiveCampaigns: FC<{ title: string }> = ({ title }: { title: string }) => {
  const theme = getTheme();

  const carouselButtonStyles = css`
    .carouselLeftButton button,
    .carouselRightButton button {
      padding: 15px;
      border: none;

      &:focus {
        outline: none;
      }
      &:hover {
        border: 0;
      }
    }
  `;

  const StyledCarouselContainer = styled.div`
    ${carouselButtonStyles}
  `;

  const componentTheme: CustomFlowbiteTheme['carousel'] = {
    root: {
      base: 'relative h-full w-full',
      leftControl: 'carouselLeftButton absolute top-1/2 transform -translate-y-1/2',
      rightControl: 'carouselRightButton absolute top-1/2 right-0 transform -translate-y-1/2',
    },
    scrollContainer: {
      base: `${theme.carousel.scrollContainer.base} pb-1`,
    },
    control: {
      icon: 'text-black h-5 w-5 text-white dark:text-gray-800 sm:h-6 sm:w-6',
    },
  };

  return (
    <CSCard
      title={title}
      className="col-span-3"
    >
      <div className=" min-h-[20px]">
        <div className="flex items-center justify-center w-full h-full gap-4 rounded-lg">
          <CSActiveCampaignsCard title="Campaign Name" />
          <CSActiveCampaignsCard title="Campaign Name 2" />
          <CSActiveCampaignsCard title="Campaign Name 3" />
        </div>
      </div>
      <span className="CurrentseaButton ml-auto mr-2">
        <a
          href="/"
          className="flex Text text-zinc-900 text-xs font-semibold leading-none p-2"
        >
          See all...
        </a>
      </span>
    </CSCard>
  );
};
