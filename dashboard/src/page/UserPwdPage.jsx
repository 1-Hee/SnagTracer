// libs
import React, { useState, useEffect } from 'react';
import { isAuthenticated } from "../auth"

// assets

// components
import FindUserPwdDialog from '../units/FindUserPwdDialog';
import ChangeUserPwdDialog from '../units/ChangeUserPwdDialog'

const UserPwdPage = () => {
    const [isVerified, setIsVerified] = useState(isAuthenticated());
    const [verifiedUserId, setVerifiedUserId] = useState(null);
  
    return isVerified ? (
      <ChangeUserPwdDialog userId={verifiedUserId} />      
    ) : (
      <FindUserPwdDialog
        onVerified={()=>{setIsVerified(true)}}
      />
    );
}

export default UserPwdPage;