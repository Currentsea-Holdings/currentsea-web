import type { CustomFlowbiteTheme } from 'flowbite-react';
import { Button, Modal, getTheme } from 'flowbite-react';
import { CSButton } from '@/components';

interface CreateCampaignPromptProps {
  show: boolean;
  setShow: (value: boolean) => void;
  startWizard: (value: boolean) => void;
}

export const CreateCampaignPrompt = ({ show, setShow, startWizard }: CreateCampaignPromptProps) => {
  const modalTheme: CustomFlowbiteTheme['modal'] = getTheme().modal;

  const componentTheme: CustomFlowbiteTheme['modal'] = {
    ...modalTheme,
    content: {
      inner: `${modalTheme.content?.inner} p-5`,
    },
    body: {
      base: `${modalTheme.body?.base} p-0`,
    },
    header: {
      popup: `${modalTheme.header?.popup} p-0 pb-6`,
      close: {
        base: `${modalTheme.header?.close?.base} !text-dark`,
      },
    },
  };

  const handleClick = () => {
    setShow(false);
    startWizard(true);
  };

  return (
    <Modal
      theme={componentTheme}
      show={show}
      size="md"
      onClose={() => {
        setShow(false);
      }}
      popup
    >
      <Modal.Header>
        <h2 className="font-semibold">Create a New Campaign</h2>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <h3 className="mb-5 text-left text-base font-medium text-dark">
            Would you like to start from scratch or receive help from our AI Campaign Assistant?
          </h3>
          <div className="flex justify-center gap-4">
            <CSButton
              className="rounded-lg bg-primary"
              onClick={() => {
                handleClick();
              }}
            >
              {'Start from scratch'}
            </CSButton>
            <Button
              color="gray"
              className="rounded-lg"
              disabled
              onClick={() => {
                setShow(false);
              }}
            >
              Campaign Assistant
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
