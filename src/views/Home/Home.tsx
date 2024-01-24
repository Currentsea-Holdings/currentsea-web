import { FC } from 'react';
import classNames from 'classnames';
import Icons, { ChartMixedDollarIcon, RotateIcon, MouseIcon } from '@/assets/icons';
import { CSUpcomingTasks } from '@/views/Home/CSUpcomingTasks';
import { CSActiveCampaigns } from '@/views/Home/CSActiveCampaigns';
import { CSCard } from '@/components/common';
import { CSCardAnalytics } from '@/views/Home/CSCardAnalytics';
import { DashboardLayout } from '@/layout/DashboardLayout';
import { Footer } from 'flowbite-react';
import { Modal } from 'flowbite-react';
import { useState } from 'react';

interface HomeProps {
  className?: string;
}

export const Home: FC<HomeProps> = ({ className, ...props }: HomeProps) => {
  return (
    <DashboardLayout>
      <h1 className="my-2">Home</h1>
      <div
        className={classNames('grid w-full grid-cols-1 gap-4 mt-4 md:grid-cols-2 xl:grid-cols-3')}
      >
        <CSCardAnalytics
          icon={ChartMixedDollarIcon}
          amount="$950"
          label="Earnings"
        />
        <CSCardAnalytics
          icon={RotateIcon}
          amount="123"
          label="Conversions"
        />
        <CSCardAnalytics
          icon={MouseIcon}
          amount="23"
          label="Affiliate Link Clicks"
        />
      </div>
      <div className="grid w-full grid-cols-1 gap-4 mt-4 md:grid-cols-2 xl:grid-cols-3">
        <CSCard
          className="max-h-[436px]"
          title="Today's Schedule"
        >
          <div className="bg-[#edfafa] flex flex-col gap-1 w-full items-start px-2 py-1 rounded-lg">
            <div className="text-[#075c68]">12:30-15:00</div>
            <div className="text-lg font-medium leading-[27px] text-[#065d69]">Flowbite Meet</div>
          </div>
          <div className="bg-[#edfafa] flex flex-col gap-1 w-full items-start px-2 py-1 rounded-lg">
            <div className="text-[#075c68]">12:30-15:00</div>
            <div className="text-lg font-medium leading-[27px] text-[#065d69]">Flowbite Meet</div>
          </div>
          <div className="bg-[#edfafa] flex flex-col gap-1 w-full items-start px-2 py-1 rounded-lg">
            <div className="text-[#075c68]">12:30-15:00</div>
            <div className="text-lg font-medium leading-[27px] text-[#065d69]">Flowbite Meet</div>
          </div>
        </CSCard>
        <CSUpcomingTasks title="Upcoming Tasks" />
      </div>
      <div
        className={classNames('grid w-full grid-cols-1 gap-4 mt-4 md:grid-cols-2 xl:grid-cols-3')}
      >
        <CSActiveCampaigns title="Active Campaigns" />
      </div>
      <MainContentFooter />
    </DashboardLayout>
  );
};

const Terms = () => {
  return (
    <>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        <span className='font-semibold block'>1. Acceptance of Terms</span> By accessing and using CurrentSea, you agree to be bound by these
        Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, you are not
        authorized to use CurrentSea.
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        <span className='font-semibold block'>2. Changes to Terms</span> CurrentSea reserves the right to modify or replace these Terms at any
        time. It is your responsibility to review these Terms periodically for changes. Your
        continued use of the website after any such changes constitutes your acceptance of the new
        Terms.
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        <span className='font-semibold block'>3. Use of Website</span> a. CurrentSea grants you a limited license to access and use the website
        for personal, non-commercial purposes. b. You agree not to use the website for any illegal
        or unauthorized purpose. c. You are responsible for any activity that occurs under your
        account.
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        <span className='font-semibold block'>4. Intellectual Property</span> All content on CurrentSea, including text, graphics, logos, and
        images, is the property of CurrentSea or its content suppliers and is protected by
        intellectual property laws.
      </p>
    </>
  );
};

const Privacy = () => {
  return (
    <>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        <span className='font-semibold block'>1. Introduction</span> Welcome to CurrentSea. We are committed to protecting the privacy of our
        visitors and users. This Privacy Policy explains how we collect, use, disclose, and
        safeguard your information when you visit our website.
      </p>

      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        <span className='font-semibold block'>2. Information</span> We Collect a. Personal Information: We may collect personal information such
        as your name, email address, and phone number when you register, subscribe, or interact with
        our website. b. Non-Personal Information: We may collect non-personal information such as
        your browser type, IP address, and the pages you visit on our site to improve our service.
      </p>

      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        <span className='font-semibold block'>3. Use of Information</span> The information we collect is used to: Provide, operate, and maintain
        our website Improve, personalize, and expand our website Understand and analyze how you use
        our website Develop new products, services, features, and functionality
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        <span className='font-semibold block'>4. Sharing of Information</span> We do not sell, trade, or otherwise transfer to outside parties
        your personally identifiable information unless we provide users with advance notice. This
        does not include website hosting partners and other parties who assist us in operating our
        website, conducting our business, or serving our users, so long as those parties agree to
        keep this information confidential.
      </p>

      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        <span className='font-semibold block'>5. Security We implement</span> a variety of security measures to maintain the safety of your
        personal information.
      </p>

      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        <span className='font-semibold block'>6. Third-Party Links</span> Occasionally, at our discretion, we may include or offer third-party
        products or services on our website. These third-party sites have separate and independent
        privacy policies.
      </p>

      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        <span className='font-semibold block'>7. Children&apos;s Privacy</span> Our website does not address anyone under the age of 13. We do
        not knowingly collect personal identifiable information from children under 13.
      </p>

      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        <span className='font-semibold block'>8. Changes to This Privacy Policy</span> We may update our Privacy Policy from time to time. We
        will notify you of any changes by posting the new Privacy Policy on this page.
      </p>
    </>
  );
};

const MainContentFooter: FC = function () {
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState(Terms());

  const openTermsModal = () => {
    setOpenModal(true);
    setModalContent(Terms());
  };
  const openPrivacyModal = () => {
    setOpenModal(true);
    setModalContent(Privacy());
  };

  return (
    <>
      <Modal
        show={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
      >
        <Modal.Header>Terms of Service</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">{modalContent}</div>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            I accept
          </button>
          <button
            color="gray"
            onClick={() => {
              setOpenModal(false);
            }}
          >
            Decline
          </button>
        </Modal.Footer>
      </Modal>
      <Footer container>
        <div className="flex w-full flex-col gap-y-6 lg:flex-row lg:justify-between lg:gap-y-0">
          <Footer.LinkGroup>
            <button
              onClick={() => {
                openTermsModal();
              }}
              className="bg-white mr-3 mb-3 lg:mb-0 text-primary"
            >
              Terms and conditions
            </button>
            <button onClick={() => {
                openPrivacyModal();
              }} className="bg-white mr-3 mb-3 lg:mb-0 text-primary">Privacy Policy</button>
          </Footer.LinkGroup>
        </div>
      </Footer>
      <p className="my-8 text-center text-sm text-gray-500 dark:text-gray-300">
        &copy; 2019-2022 Flowbite.com. All rights reserved.
      </p>
    </>
  );
};
