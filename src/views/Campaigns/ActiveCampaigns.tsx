import '@/styles/campaign-card.styles.css';

import { useEffect, useState } from 'react';

import { userProfileApi } from '@/api/userProfileApi';
import nikeLogo from '@/assets/nikelogo.png';
import { ButtonAdd } from '@/components/ButtonAdd';
import { DashboardLayout } from '@/layouts';
import { useAuthStore } from '@/stores/authStore';
import { useCreateCampaignStore } from '@/stores/createCampaignStore';

import CampaignSearchBar from './components/CampaignSearchBar';
import { CreateCampaignPrompt } from './components/CreateCampaignPrompt';
import { FullCampaignCard } from './components/FullCampaignCard';
import { CreateCampaignWizard } from './CreateCampaign/CreateCampaignWizard';

export const ActiveCampaigns = () => {
  const user = useAuthStore((state) => state.user);
  const userProfile = useAuthStore((state) => state.userProfile);
  const showCreateCampaignWizard = useCreateCampaignStore(
    (state) => state.showCreateCampaignWizard,
  );
  const setShowCreateCampaignWizard = useCreateCampaignStore(
    (state) => state.setShowCreateCampaignWizard,
  );
  // const [campaigns, setCampaigns] = useState<Array[]>([]);

  useEffect(() => {
    if (userProfile && user) {
      const fetchProfileActiveCampaigns = async () => {
        const activeCampaigns = await userProfileApi.getUserProfileActiveCampaigns(userProfile.id);
        // setCampaigns(activeCampaigns)
        console.log('userProfiles active campaigns', activeCampaigns); // consoling for now
      };
      fetchProfileActiveCampaigns().catch((error: unknown) => {
        console.error('Failed to fetch user profile:', error);
      });
    }
  }, [user, userProfile]);

  const cardPlaceholders = {
    title: 'Just Do It',
    brand: 'Nike',
    endDate: '07/29/23',
    linkUrl: 'http://www.nike.com',
  };

  const [showCreateCampaignPrompt, setShowCreateCampaignPrompt] = useState(false);

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-xxl my-2 pl-2 font-semibold">Active Campaigns</h1>
        <CampaignSearchBar />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
        <FullCampaignCard
          title={cardPlaceholders.title}
          brand={cardPlaceholders.brand}
          endDate={cardPlaceholders.endDate}
          imgUrl={nikeLogo}
          linkUrl={cardPlaceholders.linkUrl}
          detailPath={`/active-campaigns/${cardPlaceholders.brand}/detail`}
          // detailPath={`/active-campaigns/${campaign.id}/detail`}
        />
        {/* LEAVING BELOW COMMENTED OUT UNTIL WE HAVE SET PROPER METHODS TO FETCH ON THE BACK END */}
        {/* {campaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            title={campaign.title}
            brand={campaign.brand}
            endDate={campaign.endDate}
            imgUrl={campaign.imgUrl}
            linkUrl={`/campaigns/${campaign.id}`}
            detailPath={`/active-campaigns/${campaign.id}/detail`} 
          />
        ))} */}
        <CreateCampaignPrompt
          show={showCreateCampaignPrompt}
          setShow={setShowCreateCampaignPrompt}
          startWizard={setShowCreateCampaignWizard}
        />
        <ButtonAdd
          size="sm"
          onClick={() => {
            setShowCreateCampaignPrompt(true);
          }}
        />
      </div>
      {showCreateCampaignWizard && <CreateCampaignWizard />}
    </DashboardLayout>
  );
};
