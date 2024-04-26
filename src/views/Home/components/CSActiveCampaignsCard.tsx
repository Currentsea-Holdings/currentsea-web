import { CSCard } from '@/components';

interface CSActiveCampaignsCardProps {
  title: string;
  brand: string;
}

export const CSActiveCampaignsCard = ({ title, brand }: CSActiveCampaignsCardProps) => {
  return (
    <CSCard
      padding="p-4"
      imgAlt="Meaningful alt text for an image that is not purely decorative"
      imgSrc="https://www.flowbite-react.com/images/blog/image-1.jpg"
    >
      <div className="HeadingText flex h-12 flex-col items-start justify-start gap-0.5 self-stretch">
        <h5 className="self-stretch font-['Montserrat'] text-xl font-semibold leading-normal text-zinc-900 dark:text-white">
          {title}
        </h5>
        <p className="Text leading-normdark:text-gray-400 self-stretch font-['Montserrat'] text-base font-normal text-zinc-900 underline">
          {brand}
        </p>
      </div>
    </CSCard>
  );
};

<div className="Card inline-flex w-80 flex-col items-start justify-start gap-0.5 rounded-lg">
  <div className="ImageBookmark inline-flex items-start justify-end self-stretch">
    <img
      className="CardHeader h-48 shrink grow basis-0 rounded-lg shadow"
      src="https://via.placeholder.com/312x192"
      alt="test"
    />
  </div>
  <div className="Content flex h-14 flex-col items-start justify-start gap-3 self-stretch py-0.5">
    <div className="HeadingText flex h-12 flex-col items-start justify-start gap-0.5 self-stretch">
      <div className="Heading self-stretch font-['Montserrat'] text-xl font-semibold leading-normal text-zinc-900">
        Campaign Name
      </div>
      <div className="Text self-stretch font-['Montserrat'] text-base font-normal leading-normal text-zinc-900 underline">
        Brand Name
      </div>
    </div>
  </div>
</div>;
