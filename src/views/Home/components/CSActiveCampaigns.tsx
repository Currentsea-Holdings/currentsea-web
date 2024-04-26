import type { CustomFlowbiteTheme } from 'flowbite-react';
import { getTheme } from 'flowbite-react';
import { ArrowRight } from 'flowbite-react-icons/outline';

import emptyState from '@/assets/images/common/empy-state.svg';
import { CSButton, CSCard } from '@/components';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { CSActiveCampaignsCard } from './CSActiveCampaignsCard';

interface CSActiveCampaignsProps {
  title: string;
  campaigns?: {
    title: string;
    brand: string;
  }[];
}

export const CSActiveCampaigns = ({ title, campaigns = [] }: CSActiveCampaignsProps) => {
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
        <div className="flex h-full w-full items-center justify-center gap-4 rounded-lg">
          {campaigns.length > 0 ? (
            campaigns.map((item) => (
              <CSActiveCampaignsCard
                key={item.title}
                title={item.title}
                brand={item.brand}
              />
            ))
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-lg py-20">
              <img
                src={emptyState}
                alt="No active campaigns"
              />
              <p className="mt-4">No active campaigns</p>
              <CSButton
                onClick={() => {}}
                className="w-50 mt-4 flex h-9 cursor-pointer items-center justify-center rounded-lg text-sm font-semibold text-primary"
                outline
              >
                <p className="mr-1">Find an opportunity</p> <ArrowRight />
              </CSButton>
            </div>
          )}
        </div>
      </div>
      {campaigns.length > 0 && (
        <span className="CurrentseaButton ml-auto mr-2">
          <a
            href="/"
            className="Text flex p-2 text-xs font-semibold leading-none text-zinc-900"
          >
            See all...
          </a>
        </span>
      )}
    </CSCard>
  );
};
