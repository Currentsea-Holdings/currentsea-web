import type { CustomFlowbiteTheme } from 'flowbite-react';
import { Carousel, getTheme } from 'flowbite-react';

import Icons from '@/assets/icons';
import emptyState from '@/assets/images/common/empy-state.svg';
import { CSCard } from '@/components';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { CSUpcomingTasksCard } from '../../Home/components/CSUpcomingTasksCard';

interface TasksProps {
  title: string;
  tasks?: {
    title: string;
  }[];
  emptyStateImg?: string;
  className?: string;
}

export const CampaignTaskCard = ({ title, tasks = [], emptyStateImg, className }: TasksProps) => {
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

  const theme = getTheme();

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

  const taskGroups = [];
  for (let i = 0; i < tasks.length; i += 2) {
    taskGroups.push(
      <div
        key={i}
        className="flex h-full w-full items-center justify-center gap-4 px-14"
      >
        <CSUpcomingTasksCard title={tasks[i].title} />
        {tasks[i + 1] && <CSUpcomingTasksCard title={tasks[i + 1].title} />}
      </div>,
    );
  }

  return (
    <CSCard
      title={title}
      className={`col-span-2 ${className}`}
    >
      <div className="-mx-4 max-h-[304px] min-h-[20px] sm:h-64 xl:h-80 2xl:h-96">
        {tasks.length > 0 ? (
          <StyledCarouselContainer className="h-full">
            <Carousel
              theme={componentTheme}
              indicators={false}
              slide={false}
              draggable={false}
              className="overflow-visible"
              leftControl={<Icons.LeftArrowIcon />}
              rightControl={<Icons.RightArrowIcon />}
            >
              {taskGroups}
            </Carousel>
          </StyledCarouselContainer>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1 rounded-lg">
            <img
              src={emptyStateImg || emptyState}
              alt="No upcoming tasks"
              className={emptyStateImg ? 'mr-3 h-12' : ''}
            />
            <p className="mt-6">No upcoming tasks</p>
          </div>
        )}
      </div>
      {tasks.length > 0 && (
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
