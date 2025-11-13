import { Calendar, Trash2 } from 'lucide-react';

const AttendanceTable = ({ records, onDeleteRecord }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-6 py-4 text-left">#</th>
            <th className="px-6 py-4 text-left">Member Name</th>
            <th className="px-6 py-4 text-left">Login Date</th>
            <th className="px-6 py-4 text-left">Login Time</th>
            {onDeleteRecord && <th className="px-6 py-4 text-center">Action</th>}
          </tr>
        </thead>
        <tbody>
          {records.length === 0 ? (
            <tr>
              <td colSpan={onDeleteRecord ? 5 : 4} className="px-6 py-12 text-center text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-lg">No attendance records found</p>
              </td>
            </tr>
          ) : (
            records.map((record, index) => (
              <tr
                key={record.timestamp}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 font-semibold text-gray-600">{index + 1}</td>
                <td className="px-6 py-4 font-medium text-gray-800">{record.userName}</td>
                <td className="px-6 py-4 text-gray-600">{record.loginDate}</td>
                <td className="px-6 py-4 text-gray-600">{record.loginTime}</td>
                {onDeleteRecord && (
                  <td className="px-6 py-4 text-center">
                    <button
                      type="button"
                      onClick={() => onDeleteRecord(record)}
                      className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
                      title="Delete this record"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default AttendanceTable;
