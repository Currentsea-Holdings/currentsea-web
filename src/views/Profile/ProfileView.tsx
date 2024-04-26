import { HiStar } from 'react-icons/hi';

import { InstagramIcon } from '@/assets/icons';
import profilePic from '@/assets/images/authentication/agency.png';
import { CSButton } from '@/components';
import { DashboardLayout } from '@/layouts';

export const ProfileView = () => {
  const buttonStyle = {
    padding: '0px 6px',
  };
  return (
    <DashboardLayout>
      <div className="p-4">
        <div className="mb-20 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Profile</h1>
          <CSButton
            style={buttonStyle}
            className="rounded-half bg-primary font-semibold text-white"
          >
            Edit profile
          </CSButton>
        </div>
        <div className=" overflow-hidden text-center sm:rounded-lg">
          <img
            className="mx-auto h-36 w-36 rounded-full"
            src={profilePic}
            alt="User profile"
          />
          {/* get dynamic values for these fields */}
          <div className="mb-8 mt-4 inline-block">
            <div className="flex items-center justify-center space-x-6">
              <h2 className="text-lg font-bold text-gray-600">Maya Thompson</h2>
              <span className="text-sm font-bold text-gray-600">·</span>
              <h2 className="text-lg font-bold text-gray-600">Atlanta, GA</h2>
              <span className="text-sm font-bold text-gray-600">·</span>
              <span className="inline-flex items-center">
                <span className="ml-1 text-lg font-bold text-blue-600">5.0</span>
                <HiStar className="text-2xl text-yellow-300" />
              </span>
            </div>
          </div>
          <div className="mx-auto max-w-xl px-4 text-sm">
            <p>
              I&apos;m Maya, a creator on a mission to promote inclusive and clean products. I love
              sharing my passion for healthy living with my dedicated followers!
            </p>
            <div className="flex  w-full justify-center space-x-8 px-20 py-4">
              <CSButton
                style={buttonStyle}
                className="rounded-half bg-primary-light-20 font-semibold text-white"
              >
                Beauty
              </CSButton>
              <CSButton
                style={buttonStyle}
                className="rounded-half bg-primary-light-20 font-semibold text-white"
              >
                Hair
              </CSButton>
              <CSButton
                style={buttonStyle}
                className="rounded-half bg-primary-light-20 font-semibold text-white"
              >
                Health
              </CSButton>
            </div>
          </div>
          <div className="mt-4 flex justify-center space-x-40">
            <div className="text-center">
              <div className="text-sm font-bold text-gray-800">Views</div>
              <div className="text-2xl font-bold text-gray-800">511.8k</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-bold text-gray-800">Followers</div>
              <div className="text-2xl font-bold text-gray-800">246.7k</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-bold text-gray-800">Comments</div>
              <div className="text-2xl font-bold text-gray-800">40.3k</div>
            </div>
          </div>

          {/* line */}
          <div className="mt-4 border-t border-gray-200"></div>

          <div className="ml-64 mt-4 flex flex-col justify-center">
            <div className="mt-2 w-48">
              <h3 className="text-left text-sm font-semibold">Rates</h3>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 px-10 py-1 pl-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-300 sm:text-sm"
                defaultValue="Instagram"
              >
                <option value="instagram">Instagram</option>
                <option value="twitter">Twitter</option>
                <option value="facebook">Facebook</option>
              </select>
            </div>

            {/* get dynamic values for these fields */}

            <div className="flex flex-col items-start justify-center p-4">
              <div className="flex items-center space-x-2">
                <InstagramIcon className="h-6 w-6" />
                <div className="mr-4">
                  <span className="mr-12 font-semibold text-blue-600">@mayathompson</span>
                </div>
                <div className="mt-2 flex space-x-20">
                  <div className="text-center">
                    <div className="text-sm font-semibold text-gray-600">Post</div>
                    <div className="text-md font-bold text-gray-800">$750</div>{' '}
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-gray-600">Story</div>
                    <div className="text-md font-bold text-gray-800">$400</div>{' '}
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-gray-600">Reel</div>
                    <div className="text-md font-bold text-gray-800">$650</div>{' '}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
