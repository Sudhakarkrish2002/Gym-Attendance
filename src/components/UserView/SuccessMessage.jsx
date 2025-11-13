import { CheckCircle } from 'lucide-react';
import Button from '../shared/Button.jsx';

const SuccessMessage = ({ onClose }) => (
  <div className="bg-white rounded-2xl shadow-2xl p-8 text-center space-y-6">
    <div className="inline-block p-6 bg-green-100 rounded-full animate-bounce mx-auto">
      <CheckCircle className="w-16 h-16 text-green-600" />
    </div>
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Check-in Successful! ✅</h2>
      <p className="text-gray-600">Your attendance has been recorded</p>
    </div>
    <Button size="lg" className="px-8" onClick={onClose}>
      Done
    </Button>
  </div>
);

export default SuccessMessage;
