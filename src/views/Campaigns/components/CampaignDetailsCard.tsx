import { CSCard } from '@/components';
import pdf from '@/assets/pdf.svg';

interface CampaignDetailsProps {
  duration?: string;
  compensation?: string;
  description?: string;
  requirements?: string[];
  documents?: string[];
}

const CampaignDetailsCard: React.FC<CampaignDetailsProps> = ({
  duration,
  compensation,
  description,
  requirements,
  documents,
}: CampaignDetailsProps) => {
  return (
    <CSCard className="rounded-lg bg-white p-6 shadow-md">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="mb-4 text-xl font-bold">Campaign Details</h2>
        <button
          disabled
          style={{
            background: 'lightGrey',
            color: 'white',
            width: '200px',
            height: '40px',
            borderRadius: '10px',
          }}
        >
          Affiliate Link
        </button>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-gray-700">Duration:</h3>
        <p>07/05/23 - 07/29/23</p>
        <p>{duration}</p>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-gray-700">Compensation:</h3>
        <p>$600 - $4,000</p>
        <p>{compensation}</p>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-gray-700">Description:</h3>
        <p>
          Discover the radiant power of LYS Beauty&apos;s Sheer Blushes. Experience vibrant shades,
          lightweight formulas, and long-lasting wear for a natural, glowing look. Join us in
          celebrating self-expression and inclusive beauty.
        </p>
        <p>{description}</p>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-gray-700">Content Requirements:</h3>
        <ul className="list-disc pl-5">
          <li>1 Instagram Story</li>
          <li>1 30 sec Instagram Reel</li>
          <li>1 60 sec TikTok video</li>
        </ul>
        {/* ======================== Below will be the logic we use when backend is fetched  ====================== */}
        <ul className="list-disc pl-5">
          {requirements?.map((req, index) => <li key={index}>{req}</li>)}
        </ul>
      </div>

      <div>
        <h3 className="mb-2 font-semibold text-gray-700">Documents:</h3>
        <div className="flex space-x-2">
          {[...Array(5)].map((_, index) => (
            <img
              src={pdf}
              alt="pdf"
              key={index}
              className="h-6 w-6 text-gray-500"
            />
          ))}
        </div>
        {/* ==============================Below will be the logic we use when backend is fetched =================== */}
        <div className="flex space-x-2">
          {documents?.map((doc, index) => (
            <img
              key={index}
              src={doc}
              alt={`Document ${index + 1}`}
              className="h-6 w-6"
            />
          ))}
        </div>
      </div>
    </CSCard>
  );
};

export default CampaignDetailsCard;
