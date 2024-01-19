import { CSCard } from '@/components/common';
import { FC } from 'react';

export const CSActiveCampaignsCard: FC<{ title: string }> = ({ title }: { title: string }) => {
    return (
      <CSCard
        padding="p-4"
        imgAlt="Meaningful alt text for an image that is not purely decorative"
        imgSrc="https://www.flowbite-react.com/images/blog/image-1.jpg"
      >
        <div className="HeadingText self-stretch h-12 flex-col justify-start items-start gap-0.5 flex">

        <h5 className="self-stretch text-zinc-900 text-xl font-semibold font-['Montserrat'] leading-normal dark:text-white">
        {title}
      </h5>
      <p className="Text self-stretch text-zinc-900 text-base font-normal font-['Montserrat'] underline leading-normdark:text-gray-400">
        Brand Name
      </p>
        </div>
      </CSCard>
    );
  };

  <div className="Card w-80 rounded-lg flex-col justify-start items-start gap-0.5 inline-flex">
  <div className="ImageBookmark self-stretch justify-end items-start inline-flex">
      <img className="CardHeader grow shrink basis-0 h-48 rounded-lg shadow" src="https://via.placeholder.com/312x192" alt="test" />
  </div>
  <div className="Content self-stretch h-14 py-0.5 flex-col justify-start items-start gap-3 flex">
      <div className="HeadingText self-stretch h-12 flex-col justify-start items-start gap-0.5 flex">
          <div className="Heading self-stretch text-zinc-900 text-xl font-semibold font-['Montserrat'] leading-normal">Campaign Name</div>
          <div className="Text self-stretch text-zinc-900 text-base font-normal font-['Montserrat'] underline leading-normal">Brand Name</div>
      </div>
  </div>
</div>