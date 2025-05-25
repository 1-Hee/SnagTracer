import { Navigate } from 'react-router-dom';
import { getToken } from '../auth'; // 토큰 읽기 함수

const ProtectedLayout = ({ children }) => {
  const token = getToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedLayout;
