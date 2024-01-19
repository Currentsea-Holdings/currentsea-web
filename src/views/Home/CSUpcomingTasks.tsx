import { Carousel, CustomFlowbiteTheme, getTheme } from 'flowbite-react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import type { FC } from 'react';
import Icons from '@/assets/icons';
import { CSCard } from '@/components/common';
import { CSUpcomingTasksCard } from '@/views/Home/CSUpcomingTasksCard';

export const CSUpcomingTasks: FC<{ title: string }> = ({ title }: { title: string }) => {
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
      className="col-span-2"
    >
      <div className="-mx-6 min-h-[20px] max-h-[304px] sm:h-64 xl:h-80 2xl:h-96">
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
            <div className="flex items-center justify-center h-full bg-white dark:bg-gray-700 dark:text-white">
              <div className="flex items-center justify-center w-full h-full gap-4 rounded-lg px-14">
                <CSUpcomingTasksCard title="Task 1" />
                <CSUpcomingTasksCard title="Task 2" />
              </div>
            </div>
            <div className="flex items-center justify-center w-full h-full gap-4 bg-white px-14 dark:bg-gray-700 dark:text-white">
              <CSUpcomingTasksCard title="Task 3" />
              <CSUpcomingTasksCard title="Task 4" />
            </div>
            <div className="flex items-center justify-center w-full h-full gap-4 bg-white px-14 dark:bg-gray-700 dark:text-white">
              <CSUpcomingTasksCard title="Task 5" />
              <CSUpcomingTasksCard title="Task 6" />
            </div>
          </Carousel>
        </StyledCarouselContainer>
      </div>
    </CSCard>
  );
};
