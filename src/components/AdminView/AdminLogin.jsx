import { useState } from 'react';
import { LogIn } from 'lucide-react';
import Button from '../shared/Button.jsx';
import Input from '../shared/Input.jsx';
import { ADMIN_PASSWORD } from '../../constants.js';

const AdminLogin = ({ onSuccess, onCancel }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (password === ADMIN_PASSWORD) {
      onSuccess();
      setPassword('');
    } else {
      alert('Invalid admin password!');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
      <div className="text-center">
        <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
          <LogIn className="w-10 h-10 text-gray-800" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-1">Admin Login</h3>
        <p className="text-gray-500">Enter admin password to continue</p>
      </div>

      <Input
        id="admin-password"
        label="Password"
        type="password"
        value={password}
        placeholder="Enter admin password"
        onChange={(event) => setPassword(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            handleSubmit();
          }
        }}
      />

      <div className="flex flex-col gap-3">
        <Button size="lg" onClick={handleSubmit}>
          Login as Admin
        </Button>
        <Button variant="ghost" size="lg" onClick={onCancel}>
          Back to User Login
        </Button>
      </div>

      <p className="text-xs text-center text-gray-500">
        Default password:{' '}
        <code className="bg-gray-100 px-2 py-1 rounded">{ADMIN_PASSWORD}</code>
      </p>
    </div>
  );
};

export default AdminLogin;
