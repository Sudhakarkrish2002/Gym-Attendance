import { GYM_UNIQUE_ID } from '../constants.js';

const formatFilterLabel = (filterType) =>
  filterType.charAt(0).toUpperCase() + filterType.slice(1);

export const downloadAttendanceReport = ({ records, filterType }) => {
  if (typeof window === 'undefined') return;

  const currentDate = new Date();
  const dateStr = currentDate.toISOString().split('T')[0];
  const timeStr = currentDate.toLocaleTimeString('en-IN', { hour12: false }).replace(/:/g, '-');
  const fileName = `Yash-Fitness-Gym-Attendance-Report-${formatFilterLabel(filterType)}-${dateStr}-${timeStr}.html`;

  const htmlContent = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Yash Fitness Gym - Attendance Report</title>
<style>
@page { margin: 1cm; }
body { font-family: Arial, sans-serif; padding: 20px; background: white; margin: 0; color: #0f172a; }
.container { max-width: 1000px; margin: 0 auto; background: white; padding: 30px; }
.header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #2563eb; padding-bottom: 20px; }
h1 { color: #2563eb; margin: 0 0 10px 0; font-size: 28px; }
.gym-name { font-size: 22px; color: #1e40af; font-weight: bold; margin-bottom: 5px; }
.meta { background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.meta-item { padding: 10px; }
.meta-item strong { color: #1e40af; }
table { width: 100%; border-collapse: collapse; margin-top: 20px; }
th { background: #2563eb; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #1e40af; }
td { padding: 10px; border: 1px solid #e5e7eb; }
tr:nth-child(even) { background: #f9fafb; }
.footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #e5e7eb; color: #6b7280; font-size: 12px; text-align: center; }
@media print { body { padding: 0; } .container { padding: 20px; } }
</style>
</head>
<body>
<div class="container">
  <div class="header">
    <div class="gym-name">🏋️ YASH FITNESS GYM</div>
    <h1>Attendance Report</h1>
  </div>
  
  <div class="meta">
    <div class="meta-item">
      <strong>Report Type:</strong><br>
      ${formatFilterLabel(filterType)}
    </div>
    <div class="meta-item">
      <strong>Generated On:</strong><br>
      ${currentDate.toLocaleString('en-IN')}
    </div>
    <div class="meta-item">
      <strong>Total Records:</strong><br>
      ${records.length}
    </div>
    <div class="meta-item">
      <strong>Gym ID:</strong><br>
      ${GYM_UNIQUE_ID}
    </div>
  </div>
  
  <table>
    <thead>
      <tr>
        <th style="width: 50px;">#</th>
        <th>User ID</th>
        <th>Member Name</th>
        <th>Login Date</th>
        <th>Login Time</th>
      </tr>
    </thead>
    <tbody>
      ${
        records.length === 0
          ? '<tr><td colspan="5" style="text-align: center; padding: 40px; color: #6b7280;">No attendance records found for selected period</td></tr>'
          : records
              .map(
                (record, idx) => `
      <tr>
        <td><strong>${idx + 1}</strong></td>
        <td><code style="background: #e0e7ff; padding: 4px 8px; border-radius: 4px;">${record.userId}</code></td>
        <td><strong>${record.userName}</strong></td>
        <td>${record.loginDate}</td>
        <td>${record.loginTime}</td>
      </tr>
    `
              )
              .join('')
      }
    </tbody>
  </table>
  
  <div class="footer">
    <p><strong>Yash Fitness Gym</strong> - Attendance Management System</p>
    <p>This is an official computer-generated report | Generated automatically</p>
    <p>For any queries, contact gym administration</p>
  </div>
</div>
</body>
</html>`;

  // Create a blob with the HTML content
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  // Create a temporary anchor element and trigger download
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  
  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
