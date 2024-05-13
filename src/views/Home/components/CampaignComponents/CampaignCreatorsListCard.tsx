import { CSCard } from '@/components';
import { Carousel, getTheme } from 'flowbite-react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Icons from '@/assets/icons';

interface CreatorsProps {
  title: string;
  creators: {
    name: string;
    imageSrc: string;
  }[];
  className?: string;
}

export const CampaignCreatorsListCard = ({ title, creators, className }: CreatorsProps) => {
  return (
    <CSCard
      title={title}
      className={`col-span-2 ${className}`}
    >
      <div className="-mx-4 flex overflow-x-auto py-2">
        {creators.map((creator, index) => (
          <div
            key={index}
            className="mr-4 pl-10 flex flex-col items-center justify-center"
          >
            <img
              src={creator.imageSrc}
              alt={creator.name}
              className="h-12 w-12 rounded-full object-cover"
            />
            <span className="mt-2 text-center text-sm">{creator.name}</span>
          </div>
        ))}
      </div>
    </CSCard>
  );
};
