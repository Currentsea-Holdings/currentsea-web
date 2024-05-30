import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { CampaignStage } from '@/api/types';

import type { CampaignType } from '@/api/types';
export interface CampaignFormData {
  campaignDetails: {
    name: string;
    startDate: Date | null;
    endDate: Date | null;
    applicationDueDate: Date | null;
    description: string;
    coverPhoto?: File | null;
    minComp: number;
    maxComp: number;
    stage: CampaignStage;
    type: CampaignType | undefined;
  };
  reqAndComp: {
    requirements: string[];
    minComp?: number | null;
    maxComp?: number | null;
  };
}

interface CampaignState {
  formData: Partial<CampaignFormData>;
  setFormData: (data: Partial<CampaignFormData>) => void;
  showCreateCampaignWizard: boolean;
  setShowCreateCampaignWizard: (show: boolean) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  coverPhoto: File | null;
  setCoverPhoto: (photo: File | null) => void;
}

export const useCreateCampaignStore = create<CampaignState>()(
  devtools(
    (set) => ({
      formData: {
        campaignDetails: {
          name: '',
          startDate: null,
          endDate: null,
          applicationDueDate: null,
          description: '',
          coverPhoto: null,
          minComp: 0,
          maxComp: 0,
          stage: CampaignStage.Discovery,
          type: undefined,
        },
        reqAndComp: {
          requirements: [''],
          minComp: null,
          maxComp: null,
        },
      },
      coverPhoto: null,
      setCoverPhoto: (photo) => {
        set({ coverPhoto: photo });
      },
      setFormData: (data) => {
        set((state) => ({ formData: { ...state.formData, ...data } }));
      },
      showCreateCampaignWizard: false,
      setShowCreateCampaignWizard: (show) => {
        set({ showCreateCampaignWizard: show });
      },
      currentStep: 1,
      setCurrentStep: (step) => {
        set({ currentStep: step });
      },
    }),
    { name: 'CreateCampaignStore' },
  ),
);

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('CreateCampaignStore', useCreateCampaignStore);
}
