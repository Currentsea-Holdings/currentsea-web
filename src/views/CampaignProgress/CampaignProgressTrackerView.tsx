/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable react/prop-types */
// /* eslint-disable @typescript-eslint/no-useless-template-literals */
// /* eslint-disable react/prop-types */

import { WaitingTimeIcon } from '@/assets/icons';
import React from 'react';

interface CampaignProgressProps {
  stepNum: number; 
  waitingForCreators: boolean; 
  showNav: boolean; 
}

const CampaignProgress: React.FC<CampaignProgressProps> = ({
  stepNum,
  waitingForCreators,
  showNav,
}) => {
  const stages = ['Discovery', 'Negotiation', 'Content Production', 'Live Campaign', 'Reviews'];
  const isComplete = stepNum === stages.length + 1; // Assume the 6th step is "Campaign Complete"

  return (
    <div
      className="ml-8 mt-8 h-36 w-full max-w-xs rounded-lg p-4 shadow"
      style={{ backgroundColor: '#fbfeff', float: 'left' }}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold">Progress</h2>
        {waitingForCreators && (
          <span
            className="flex items-center rounded-md bg-gray-200 px-2 py-1 font-semibold text-gray-600"
            style={{ fontSize: '0.4rem' }}
          >
            <WaitingTimeIcon className="mr-8" />
            Waiting for other creators
          </span>
        )}
      </div>

      
      <div className="flex justify-between items-center">
        {stages.map((stage, index) => (
          <div
            key={index}
            className={`relative col-span-1 flex items-center justify-center p-0 ${index + 1 <= stepNum ? 'border-blue-500 bg-blue-500' : 'border-blue-500 bg-white'} border-2 ${index + 1 === stepNum ? 'h-10 bg-white' : 'h-4'} ${index === 0 ? 'rounded-l-full' : ''} ${index === stages.length - 1 ? 'rounded-r-full' : ''} px-[1.6rem]`}
          >
            {index + 1 === stepNum && (
              <>
                <span
                  className="absolute text-xs p-0 font-bold text-blue-500"
                  style={{
                    bottom: '50%',
                    transform: 'translateY(50%)',
                    fontSize: '0.46rem',
                    whiteSpace: 'normal',
                    lineHeight: '0.7rem',
                    textAlign: 'center', 
                    width: '100%' 
                    
                  }}
                >
                  {stage.split(' ').map((word, i) => (
                    <React.Fragment key={i}>
                      {word}
                      {i < stage.split(' ').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </span>
                <span
                  className="absolute text-xs font-bold text-blue-500"
                  style={{
                    top: '40px',
                    left: '-4%',
                    width: '100%',
                    fontSize: '0.46rem',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Current Stage
                </span>
              </>
            )}
          </div>
        ))}
      </div>

      {isComplete && (
        <div className="mt-6 text-center text-xs font-semibold text-blue-500">
          Campaign Complete!
        </div>
      )}

      {showNav && !isComplete && (
        <div
          className="mt-8 flex justify-between text-gray-400"
          style={{ fontSize: '0.5rem' }}
        >
          {stepNum > 1 ? (
            <span
              className="cursor-pointer hover:text-gray-600 font-semibold"
              onClick={() => console.log('Previous Stage')}
            >
              &#60; previous stage
            </span>
          ) : (
            <span className="text-gray-600">&#60; Previous</span> 
          )}
          {stepNum < stages.length ? (
            <span
              className="cursor-pointer hover:text-gray-600 font-semibold"
              onClick={() => console.log('Next Stage')}
            >
              next stage &#62;
            </span>
          ) : (
            <span className="text-gray-600">next stage &#62;</span>
          )}
        </div>
      )}
    </div>
  );
};

export default CampaignProgress;
