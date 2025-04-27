// libs
import React from 'react';

const JoinMember = ({name}) => {
    return (
        <div className="flex items-center mb-2">
        <div className="w-6 h-6 rounded-full bg-pale-blue300 text-white flex items-center justify-center mr-2">
          {name[0]}
        </div>
        <span className="text-sm text-mono800">{name}</span>
      </div>
    )
}

export default JoinMember;