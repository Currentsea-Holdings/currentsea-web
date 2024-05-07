import { DashboardLayout } from '@/layouts';
import { useNavigate, useParams } from 'react-router-dom';
import nikeLogo from '@/assets/nikelogo.png';
import CampaignCard from '../Home/components/CampaignComponents/FullCampaignCard';
import CampaignCardDetailPreview from '../Home/components/CampaignComponents/CampaignCardPreview';
import { CSUpcomingTasks } from '../Home/components/CSUpcomingTasks';
import CampaignDetailsCard from '../Home/components/CampaignComponents/CampaignDetailsCard';
import { CampaignTaskCard } from '../Home/components/CampaignComponents/CampaignTaskCard';
import { userProfileApi } from '@/api/userProfileApi';
import { useAuthStore } from '@/stores/authStore';
import { useEffect, useState } from 'react';

const ActiveCampaignDetailView = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const userProfile = useAuthStore((state) => state.userProfile);
  const [campaignDetails, setCampaignDetails] = useState<object>({});
  const { id } = useParams();

  const handleNavigate = () => {
    navigate('/active-campaigns');
  };

  const cardPlaceholders = {
    title: 'Just Do It',
    brand: 'Nike',
    endDate: '07/29/23',
    linkUrl: 'http://www.nike.com',
  };

  useEffect(() => {
    if (userProfile && user) {
      const fetchProfileActiveCampaigns = async () => {
        const campaignDetails = await userProfileApi.getUserProfileActiveCampaignById(
          userProfile.id,
        );
        setCampaignDetails(campaignDetails);
        console.log('userProfiles active campaigns', campaignDetails); // consoling for now
      };
      fetchProfileActiveCampaigns().catch((error: unknown) => {
        console.error('Failed to fetch user profile:', error);
      });
    }
  }, [user, userProfile]);

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between">
        <div
          style={{
            flex: '1',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <button onClick={handleNavigate}>
            <h1 className="text-xxl my-2 pl-2 font-semibold">Active Campaigns</h1>
          </button>
          <svg
            className="ml-3 mt-1 h-6 w-6 text-gray-600"
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
          <span className="ml-2 mt-1">{id}</span>
        </div>
        <button
          style={{
            background: '#007bff',
            color: 'white',
            width: '150px',
            height: '35px',
            marginRight: '1rem',
            borderRadius: '12px',
          }}
        >
          Message
        </button>
      </div>
      <div className="p-2">
        <CampaignCardDetailPreview
          title={cardPlaceholders.title}
          brand={cardPlaceholders.brand}
          imgUrl={nikeLogo}
          linkUrl={cardPlaceholders.linkUrl}
        />
      </div>
      <div>
        <CampaignTaskCard title="My Tasks" />
      </div>
      <div>
        <CampaignDetailsCard {...campaignDetails} />
      </div>
    </DashboardLayout>
  );
};

export default ActiveCampaignDetailView;
