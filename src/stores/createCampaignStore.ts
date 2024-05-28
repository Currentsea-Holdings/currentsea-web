import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { CampaignStage, CampaignType } from '@/api/types';
import type { CampaignFormData } from '@/types';
import { mountStoreDevtool } from 'simple-zustand-devtools';

interface CampaignState {
  formData: Partial<CampaignFormData>;
  setFormData: (data: Partial<CampaignFormData>) => void;
  showCreateCampaignWizard: boolean;
  setShowCreateCampaignWizard: (show: boolean) => void;
}

export const useCreateCampaignStore = create<CampaignState>()(
  devtools(
    (set) => ({
      formData: {
        name: '',
        startDate: new Date(),
        endDate: new Date(),
        applicationDueDate: new Date(),
        description: '',
        coverPhoto: '',
        minComp: 0,
        maxComp: 0,
        stage: CampaignStage.Discovery,
        type: CampaignType.AffiliateProgram,
      },
      setFormData: (data) => { set((state) => ({ formData: { ...state.formData, ...data } })); },
      showCreateCampaignWizard: false,
      setShowCreateCampaignWizard: (show) => { set({ showCreateCampaignWizard: show }); },
    }),
    { name: 'CreateCampaignStore' }
  )
);

if (process.env.NODE_ENV === 'development') {
    mountStoreDevtool('CreateCampaignStore', useCreateCampaignStore);
  }