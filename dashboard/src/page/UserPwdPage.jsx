// libs
import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";

// assets

// components
import FindUserPwdDialog from '../units/FindUserPwdDialog';
import ChangeUserPwdDialog from '../units/ChangeUserPwdDialog'

const UserPwdPage = () => {
    const [step, setStep] = useState('verify');
    const [verifiedUserId, setVerifiedUserId] = useState(null);
  
    return step === 'verify' ? (
      <FindUserPwdDialog
        onVerified={(userId) => {
          setVerifiedUserId(userId);
          setStep('reset');
        }}
      />
    ) : (
      <ChangeUserPwdDialog userId={verifiedUserId} />
    );
}

export default UserPwdPage;