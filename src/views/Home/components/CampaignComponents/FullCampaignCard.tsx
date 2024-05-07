import { Card } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';

interface CampaignCardProps {
  title: string;
  brand: string;
  endDate: string;
  imgUrl: string;
  linkUrl: string;
  detailPath: string;
}

const FullCampaignCard: React.FC<CampaignCardProps> = ({
  title,
  brand,
  endDate,
  imgUrl,
  linkUrl,
  detailPath,
}: CampaignCardProps) => {
  const navigate = useNavigate();


  const handleNavigate = () => {
    navigate(detailPath);
  };

  return (
    <Card className="campaign-card">
      <div style={{ display: 'flex'}}>
        <div
          className="flex items-center"
          style={{ width: '50%' }}
        >
          <img
            src={imgUrl}
            alt={brand}
            className="mr-4 h-20 w-20 rounded-full object-cover"
          />
          <div>
            <h1 className="text-xl font-semibold">{title}</h1>
            <Link
              to={linkUrl}
              className="text-m text-gray-500"
            >
              {brand}
            </Link>
          </div>
        </div>
        <div
          style={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 className="text-xl text-gray-600">End Date</h1>
            <p className="text-sm">{endDate}</p>
          </div>
          <svg
            onClick={handleNavigate}
            className="h-6 w-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Card>
  );
};

export default FullCampaignCard;
