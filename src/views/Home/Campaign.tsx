// import React from 'react';
// import { useTheme } from '@/context/ThemeContext';

// const Content: React.FC = () => {
//   const { theme, setTheme } = useTheme();

//   setTheme('bloo');

//   return (
//     <div className="flex-1 p-10">
//       <button className={`bg-${theme} bg-all text-white py-2 px-4 rounded`}>
//         Dynamic Button bg-${theme}
//       </button>
//       {/* Add more UI to change theme */}
//     </div>
//   );
// };

// export default Content;

import type React from 'react';
// import { useTheme } from '@/context/ThemeContext';
import { Button } from 'flowbite-react';
import { CSButton } from '@/components/common/CSButton';
import { Card } from 'flowbite-react';
import type { CustomFlowbiteTheme } from 'flowbite-react';

export const Campaign: React.FC = () => {
  // const { theme } = useTheme();

  // const customTheme: CustomFlowbiteTheme['button'] = {
  //   "root": {
  //     "base": "w-[749px] h-32 bg-white rounded-lg shadow border border-stone-300 justify-start items-center inline-flex",
  //     "children": "grow shrink basis-0 h-[91px] px-5 py-2 justify-start items-center gap-20 flex",
  //     "horizontal": {
  //       "off": "flex-col",
  //       "on": ""
  //     },
  //     "href": "hover:bg-gray-100 dark:hover:bg-gray-700"
  //   },
  //   "img": {
  //     "base": "",
  //     "horizontal": {
  //       "off": "rounded-t-lg",
  //       "on": "h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
  //     }
  //   }
  // };

  return (
    <>
      <div className="w-[749px] h-32 bg-white rounded-lg shadow border border-stone-300 justify-start items-center inline-flex">
        <img
          alt="placeholder"
          className="self-stretch w-48"
          src="https://via.placeholder.com/192x128"
        />
        <div className="grow shrink basis-0 h-[91px] px-5 py-2 justify-start items-center gap-20 flex">
          <div className="inline-flex flex-col items-start justify-start gap-2 grow shrink basis-0">
            <div className="self-stretch text-zinc-900 text-lg font-bold font-['Montserrat'] leading-snug">
              Higher Standard Sheer Blush
            </div>
            <div className="self-stretch text-zinc-900 text-sm font-normal font-['Montserrat'] underline leading-[21px]">
              LYS Beauty
            </div>
          </div>
          <div className="w-[174px] flex-col justify-start items-start gap-2 inline-flex">
            <div className="self-stretch text-center text-zinc-900 text-lg font-bold font-['Montserrat'] leading-snug">
              Due Date
            </div>
            <div className="self-stretch text-center text-zinc-900 text-base font-medium font-['Montserrat'] leading-normal">
              07/29/23
            </div>
          </div>
          <div className="relative w-5 h-5" />
        </div>
      </div>
      <Card
        // theme={customTheme}
        // className="max-w-sm"
        imgSrc="https://via.placeholder.com/192x128"
        horizontal
      >
        <div className="inline-flex flex-col items-start justify-start gap-2 grow shrink basis-0">
        {/* <div className="inline-flex flex-col items-start justify-start gap-2 grow shrink basis-0"> */}
            <h5 className="text-lg font-bold self-stretch tracking-tight leading-snug text-zinc-900 dark:text-white">
              Higher Standard Sheer Blush
            </h5>
            <div className="self-stretch text-zinc-900 text-sm font-normal font-['Montserrat'] underline leading-[21px]">
              LYS Beauty
            </div>
        </div>
        <div className="w-[174px] flex-col justify-start items-start gap-2 inline-flex">
            <div className="self-stretch text-center text-zinc-900 text-lg font-bold font-['Montserrat'] leading-snug">
              Due Date
            </div>
            <div className="self-stretch text-center text-zinc-900 text-base font-medium font-['Montserrat'] leading-normal">
              07/29/23
            </div>
          </div>
          <div className="relative w-5 h-5" />
        {/* <p className="font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
          chronological order.
        </p> */}
      </Card>
    </>
  );
};
