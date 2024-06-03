import type { CampaignFormData, campaignTask } from '@/stores/createCampaignStore';
import type { CustomFlowbiteTheme } from 'flowbite-react';
import { Label, Tabs, TextInput, getTheme } from 'flowbite-react';
import { Dollar } from 'flowbite-react-icons/outline';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { CSButton } from '@/components';
import { ButtonAdd } from '@/components/ButtonAdd';
import { SocialMediaIcon } from '@/components/SocialMediaIcon';
import { useCreateCampaignStore } from '@/stores/createCampaignStore';
import { socialMediaPlatforms } from '@/utils/socialMediaIconsCircle';
import { DevTool } from '@hookform/devtools';
import { TaskCard } from '@/components/TaskCard';

interface TasksFormProps {
  title: string;
}

export const TasksForm = ({ title }: TasksFormProps) => {
  const { formData, setFormData, setCurrentStep } = useCreateCampaignStore((state) => ({
    formData: state.formData,
    setFormData: state.setFormData,
    setCurrentStep: state.setCurrentStep,
  }));

  type FormFields = (
    | CampaignFormData['tasks']['discovery']
    | { creatorTasks: campaignTask[]; brandTasks: campaignTask[] }
  ) &
    object;

  const { register, control, handleSubmit, watch, setValue } = useForm<FormFields>({
    defaultValues: {
      creatorTasks: formData.tasks?.discovery?.creatorTasks || [],
      brandTasks: formData.tasks?.discovery?.brandTasks || [],
    },
  });

  const onSubmit = (data: FormFields) => {
    setFormData({
      tasks: {
        discovery: {
          creatorTasks: data.creatorTasks,
          brandTasks: data.brandTasks,
        },
      },
    });
    setCurrentStep(2);
  };

  const tabsTheme: CustomFlowbiteTheme['tabs'] = {
    base: `${getTheme().tabs.base} mt-8`,
    tablist: {
      styles: {
        underline: `${getTheme().tabs.tablist.styles.underline} justify-between`,
      },
      tabitem: {
        base: `${getTheme().tabs.tablist.tabitem.base} text-lg font-semibold focus:ring-0`,
        styles: {
          underline: {
            active: {
              on: `${getTheme().tabs.tablist.tabitem.styles.underline.active.on} border-primary text-primary`,
            },
          },
        },
      },
    },
  };

  const [selectedDueDate, setSelectedDueDate] = useState<Date | null>(null);

  const handleDueDateSelect = (date: Date | null) => {
    setSelectedDueDate(date);
    // Update the formData with the selected due date
    setFormData({
      reqAndComp: {
        ...formData.reqAndComp,
      },
    });
  };

  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);

  const handleDueDateChange = (date: Date) => {
    setDueDate(date);
    // Perform any other necessary actions
  };

  return (
    <>
      <h1 className="my-10 text-center font-semibold text-dark">{title}</h1>
      <h2 className="font-semibold text-dark">Tasks are assigned for each stage of the campaign</h2>
      <h3 className="font-semibold text-gray-60">
        Add descriptions for creator tasks and set due dates.
      </h3>
      <Tabs
        theme={tabsTheme}
        style="underline"
      >
        <Tabs.Item
          active
          title="Discovery"
        >
          <TaskCard
            headerText="Review Applications"
            status="incomplete"
            bodyText="Review applications"
            dueDate={dueDate}
            onDueDateChange={(date: Date | null | undefined) => { handleDueDateChange(date as Date); }}
          />
        </Tabs.Item>
        <Tabs.Item title="Negotiations">
          This is{' '}
          <span className="font-medium text-gray-800 dark:text-white">
            Dashboardassociated content
          </span>
          . Clicking another tab will toggle the visibility of this one for the next. The tab
          JavaScript swaps classes to control the content visibility and styling.
        </Tabs.Item>
        <Tabs.Item title="Content Production">
          This is{' '}
          <span className="font-medium text-gray-800 dark:text-white">
            Settingsassociated content
          </span>
          . Clicking another tab will toggle the visibility of this one for the next. The tab
          JavaScript swaps classes to control the content visibility and styling.
        </Tabs.Item>
        <Tabs.Item title="Live Campaign">
          This is{' '}
          <span className="font-medium text-gray-800 dark:text-white">
            Contactsassociated content
          </span>
          . Clicking another tab will toggle the visibility of this one for the next. The tab
          JavaScript swaps classes to control the content visibility and styling.
        </Tabs.Item>
      </Tabs>
      <CSButton
        type="button"
        size="lg"
        className="flex h-12 w-full items-center justify-center rounded-lg border bg-primary px-5"
        onClick={handleSubmit(onSubmit)}
      >
        Next: tasks
      </CSButton>
    </>
  );
};
