import { DashboardLayout } from '@/layouts';
import CampaignSearchBar from '../Home/components/CampaignComponents/CampaignSearchBar';

const PastCampaignsView = () => {
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center">
        <h1 className="my-2 pl-2 text-xxl font-semibold">Past Campaigns</h1>
        <CampaignSearchBar />
      </div>
    </DashboardLayout>
  );
};

export default PastCampaignsView;
