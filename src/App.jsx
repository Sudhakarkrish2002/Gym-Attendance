import { useState } from 'react';
import AttendanceForm from './components/UserView/AttendanceForm.jsx';
import SuccessMessage from './components/UserView/SuccessMessage.jsx';
import AdminLogin from './components/AdminView/AdminLogin.jsx';
import Dashboard from './components/AdminView/Dashboard.jsx';
import Button from './components/shared/Button.jsx';
import useAttendance from './hooks/useAttendance.js';
import { downloadAttendanceReport } from './services/pdfService.js';
import qrCodeImage from './assets/qr-code.png';

const App = () => {
  const {
    isLoading,
    filteredRecords,
    filterType,
    setFilterType,
    totalMembers,
    totalCheckins,
    markAttendance,
    deleteRecord
  } = useAttendance();

  const [userName, setUserName] = useState('');
  const [scanSuccess, setScanSuccess] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleAttendance = async () => {
    if (!userName.trim()) {
      alert('Please enter your name!');
      return;
    }

    try {
      await markAttendance({ name: userName.trim() });
      setScanSuccess(true);
      setUserName('');

      setTimeout(() => {
        setScanSuccess(false);
      }, 3000);
    } catch (error) {
      // Error is already handled in markAttendance hook
      console.error('Attendance error:', error);
    }
  };

  const handleDownloadReport = () => {
    downloadAttendanceReport({
      records: filteredRecords,
      filterType
    });
  };

  const handleDeleteRecord = (timestamp) => {
    const confirmed = window.confirm('⚠️ Are you sure you want to delete this record?');
    if (!confirmed) return;
    deleteRecord(timestamp);
    window.alert('✅ Record deleted successfully!');
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    setShowAdminLogin(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading attendance data...</p>
      </div>
    );
  }

  if (isAdmin) {
    return (
      <Dashboard
        onLogout={handleAdminLogout}
        filterType={filterType}
        onFilterChange={setFilterType}
        onDownloadReport={handleDownloadReport}
        records={filteredRecords}
        totalMembers={totalMembers}
        totalCheckins={totalCheckins}
        onDeleteRecord={handleDeleteRecord}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 p-4">
      <div className="max-w-md mx-auto mt-6 space-y-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Gym Check-In</h1>
            <p className="text-gray-600">Scan the QR code or enter your name to mark attendance</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-4 border-blue-200">
            <img
              src={qrCodeImage}
              alt="Gym QR Code"
              className="w-56 h-56 mx-auto border-4 border-blue-200 rounded-xl shadow-inner"
            />
            <p className="text-center mt-4 text-sm font-semibold text-blue-900">Gym Entrance QR</p>
          </div>
        </div>

        {scanSuccess ? (
          <SuccessMessage onClose={() => setScanSuccess(false)} />
        ) : (
          <AttendanceForm
            userName={userName}
            onUserNameChange={(event) => setUserName(event.target.value)}
            onSubmit={handleAttendance}
          />
        )}

        <Button
          variant="secondary"
          size="lg"
          className="w-full"
          onClick={() => setShowAdminLogin((current) => !current)}
        >
          {showAdminLogin ? 'Close Admin Login' : 'Admin Login'}
        </Button>

        {showAdminLogin && (
          <AdminLogin
            onSuccess={() => {
              setIsAdmin(true);
              setShowAdminLogin(false);
            }}
            onCancel={() => setShowAdminLogin(false)}
          />
        )}
      </div>
    </div>
  );
};

export default App;

