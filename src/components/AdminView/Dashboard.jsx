import { LogOut } from 'lucide-react';
import Button from '../shared/Button.jsx';
import StatsCards from './StatsCards.jsx';
import FilterBar from './FilterBar.jsx';
import AttendanceTable from './AttendanceTable.jsx';
import qrCodeImage from '../../assets/qr-code.png';

const Dashboard = ({
  onLogout,
  filterType,
  onFilterChange,
  onDownloadReport,
  records,
  totalMembers,
  totalCheckins,
  onDeleteRecord
}) => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-1">Admin Dashboard</h1>
            <p className="text-gray-600">Gym Attendance Management</p>
          </div>
          <Button variant="danger" size="lg" onClick={onLogout}>
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">🏋️ Yash Fitness Gym - QR Code</h2>
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-4 border-blue-200">
            <img
              src={qrCodeImage}
              alt="Yash Fitness Gym QR Code"
              className="w-64 h-64 mx-auto"
            />
            <p className="text-center mt-3 font-bold text-blue-900">Yash Fitness Gym</p>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-3 text-blue-900">📱 How to use this QR Code:</h3>
            <ol className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-600 text-lg">1.</span>
                <span>Print this QR code and display it at <strong>Yash Fitness Gym entrance</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-600 text-lg">2.</span>
                <span>Members scan QR code with their <strong>phone camera app</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-600 text-lg">3.</span>
                <span>Check-in page opens automatically on their phone</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-600 text-lg">4.</span>
                <span>They enter <strong>their Name</strong> to mark attendance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-600 text-lg">5.</span>
                <span>Date & Time recorded automatically in your dashboard!</span>
              </li>
            </ol>
          </div>
        </div>
      </div>

      <StatsCards
        totalMembers={totalMembers}
        totalCheckins={totalCheckins}
        filteredCount={records.length}
      />

      <FilterBar
        selectedFilter={filterType}
        onFilterChange={onFilterChange}
        onDownload={onDownloadReport}
      />

      <AttendanceTable
        records={records}
        onDeleteRecord={onDeleteRecord ? (record) => onDeleteRecord(record.timestamp) : undefined}
      />
    </div>
  </div>
);

export default Dashboard;
