import { DashboardLayout } from '@/layouts';
import { useNavigate, useParams } from 'react-router-dom';
import nikeLogo from '@/assets/nikelogo.png';
import { FullCampaignCard } from './components/FullCampaignCard';
import CampaignCardDetailPreview from './components/CampaignCardPreview';
import { CSUpcomingTasks } from '../Home/components/CSUpcomingTasks';
import CampaignDetailsCard from './components/CampaignDetailsCard';
import { CampaignTaskCard } from './components/CampaignTaskCard';
import { userProfileApi } from '@/api/userProfileApi';
import { useAuthStore } from '@/stores/authStore';
import { useEffect, useState } from 'react';
import { CampaignCreatorsListCard } from './components/CampaignCreatorsListCard';
import keeta from '@/assets/keeta.jpeg';
import tyla from '@/assets/tyla.jpeg';
import mrbeast from '@/assets/mrbeast.webp';
import loganpaul from '@/assets/loganpaulboxing.jpeg';
import caleb from '@/assets/caleb.jpg';


export const ActiveCampaignDetailView = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const userProfile = useAuthStore((state) => state.userProfile);
  const userType = useAuthStore((state) => state.user?.userType);
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
        console.log('userType:', userType);
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
      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
        <CampaignTaskCard
          title="My Tasks"
          className="mr-2 flex-1"
        />
        {userType === 'Agency' && (
          <CampaignTaskCard
            title="Creator Tasks"
            className="flex-1"
          />
        )}
      </div>
      <div>
        {userType === 'Agency' && (
          <CampaignCreatorsListCard
            title="Creators"
            creators={[
              { name: 'Keeta Hill', imageSrc: keeta },
              { name: 'Tyla', imageSrc: tyla },
              { name: 'Mr. Beast', imageSrc: mrbeast },
              { name: 'Logan Paul', imageSrc: loganpaul },
              { name: 'Caleb', imageSrc: caleb },
            ]}
            className="my-custom-class"
          />
        )}
      </div>
      <div>
        <CampaignDetailsCard {...campaignDetails} />
      </div>
    </DashboardLayout>
  );
};
