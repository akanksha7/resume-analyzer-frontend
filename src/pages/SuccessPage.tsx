import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessPage: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        <p className="mb-8">Thank you for your purchase.</p>
        <button 
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
