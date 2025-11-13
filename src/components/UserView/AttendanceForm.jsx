import Input from '../shared/Input.jsx';
import Button from '../shared/Button.jsx';

const AttendanceForm = ({ userName, onUserNameChange, onSubmit }) => (
  <div className="bg-white rounded-2xl shadow-2xl p-8">
    <div className="space-y-5">
      <Input
        label="Your Name"
        id="user-name"
        type="text"
        value={userName}
        placeholder="Enter your full name"
        onChange={onUserNameChange}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            onSubmit();
          }
        }}
      />

      <Button
        size="xl"
        className="w-full shadow-lg hover:shadow-xl"
        onClick={onSubmit}
      >
        Check In Now
      </Button>
    </div>
  </div>
);

export default AttendanceForm;
