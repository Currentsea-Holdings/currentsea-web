
import loginBackground from '@/assets/images/authentication/login-background.png';
import logo from '@/assets/logo-title-black.png';
import { useForm } from 'react-hook-form';

interface AccountSetupFormFields {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  state: string;
  profilePhoto: FileList;
}

export const AccountSetupInstructionsView: React.FC = () => {
  const { register, handleSubmit } = useForm<AccountSetupFormFields>();
  const onSubmit = (data: AccountSetupFormFields) => {
    console.log(data);
    // Handle form submission
    
  };

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/3 bg-cover bg-center bg-no-repeat p-4"
           style={{ backgroundImage: `url(${loginBackground})` }}>
        <div className="flex flex-col justify-center items-center h-full">
          <div className="bg-white p-8 min-h-[45%] rounded-lg shadow-md text-center relative w-5/6 mt-12">
            {/* Logo */}
            <img src={logo} alt="CurrentSea logo" className="w-32 md:w-30 lg:w-30 xl:w-30 -mt-4 mb-8 mx-auto max-w-xs h-auto" />

            <h2 className="text-left ml-2 text-xl text-black font-semibold mb-0">Account set up</h2>
            <p className="text-left ml-2 text-sm mb-4">Start earning in 3 easy steps!</p>

            <div className="text-left text-sm ml-2 relative">
              <div className="flex items-center mb-2">
                <div className="w-6 h-6 flex items-center justify-center border border-gray-600 text-gray-600 rounded-full mr-2">1</div>
                Creator Info
              </div>
              {/* Line */}
              <div className="border-l border-gray-600 absolute" style={{ height: '2.7rem', left: '0.7rem', top: '1.6rem' }}></div>
              <div className="flex items-center mb-2 mt-12">
                <div className="w-6 h-6 flex items-center justify-center border border-gray-600 text-gray-600 rounded-full mr-2">2</div>
                Social Media
              </div>
              {/* Line */}
              <div className="border-l border-gray-600 absolute" style={{ height: '2.7rem', left: '0.7rem', top: '6.2rem' }}></div>
              <div className="flex items-center mt-12">
                <div className="w-6 h-6 flex items-center justify-center border border-gray-600 text-gray-600 rounded-full mr-2">3</div>
                Earnings Set up
              </div>
            </div>
          </div>
        </div>
      </div>
       
      <div className="w-3/4 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-xl">
        <h3 className="text-center text-2xl font-bold text-black mb-10">Let&apos;s start with the basics...</h3>
          <form onSubmit={handleSubmit(onSubmit)} className=" bg-white space-y-10 p-10 space-y-6">
            <div className="text-left mb-0">

              <label htmlFor="profilePhoto" className="block text-gray-700 text-sm font-semibold mb-2">
                Profile photo
              </label>
              <div className="flex items-center">
                <label htmlFor="profilePhoto" className="bg-blue-600 text-white py-2 px-4 rounded-l-xl border border-blue-600 cursor-pointer">
                  Choose file
                </label>
                <div className="flex-1 relative text-gray-700 py-2 px-4 rounded-r-xl border border-gray-300">
                  <span id="file-chosen">No file chosen</span>
                  <input
                    type="file"
                    id="profilePhoto"
                    {...register('profilePhoto')}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(event) => {
                      //Need to add code here
                    }}
                  />
                </div>
              </div>
              
            </div>

            <div>
              <label htmlFor="First name" className="block text-gray-700 text-sm font-semibold mb-2">
                  First name
              </label>
              <input id="firstName" type="text" {...register('firstName')} className="block w-full  text-gray-700 p-2 border rounded-xl border-gray-300" />
            </div>
            <div>
              <label htmlFor="Last name" className="block text-gray-700 text-sm font-semibold mb-2">
                  Last name
              </label>
              <input id="lastName" type="text" {...register('lastName')} className="block w-full p-2 border rounded-xl border-gray-300" />
            </div>
            <div>
              <label htmlFor="Phone" className="block text-gray-700 text-sm font-semibold mb-2">
                  Phone
              </label>
              <input id="phone" type="text" {...register('phone')} className="block w-full p-2 border rounded-xl border-gray-300" />
            </div>
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <label htmlFor="city" className="block text-gray-700 text-sm font-semibold mb-2">
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  {...register('city')}
                  className="form-input mt-1 block w-full rounded-xl border-gray-300 text-gray-700"
                />
              </div>

              <div className="w-1/3">
                <label htmlFor="state" className="block text-gray-700 text-sm font-semibold mb-2">
                  State
                </label>
                <select
                  id="state"
                  {...register('state')}
                  className="form-select mt-1 block w-full rounded-xl border-gray-300 text-gray-700"
                >
                  <option value="">Select</option>
                  {/* Need to Add more states */}
                  <option value="state1">State 1</option>
                  <option value="state2">State 2</option>
                  <option value="state3">State 3</option>
                </select>
              </div>
            </div>
            <button type="submit" className="w-full bg-gray-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl border-gray-300">
              Next: Social Media
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};


