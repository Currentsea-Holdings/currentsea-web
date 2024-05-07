import { Card } from 'flowbite-react';
import { Link } from 'react-router-dom';

interface CampaignCardPreviewProps {
  title: string;
  imgUrl: string;
  brand: string;
  linkUrl: string;
}

const CampaignCardPreview: React.FC<CampaignCardPreviewProps> = ({
  title,
  imgUrl,
  brand,
  linkUrl,
}: CampaignCardPreviewProps) => {
  return (
    <Card className="campaign-preview-card">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
      <img
        src={imgUrl}
        alt={brand}
        className="h-20 w-20 rounded-full object-cover"
      />
        <h1 className="text-xl font-semibold">{title}</h1>
        <Link
          to={linkUrl}
          className="mt-1 text-xl text-gray-500"
        >
          {brand}
        </Link>
      </div>
    </Card>
  );
};

export default CampaignCardPreview;
