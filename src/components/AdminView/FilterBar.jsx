import { Download } from 'lucide-react';
import Button from '../shared/Button.jsx';
import { FILTER_TYPES } from '../../constants.js';

const labelMap = {
  all: 'All',
  daily: 'Daily',
  weekly: 'Weekly',
  monthly: 'Monthly',
  annual: 'Annual'
};

const FilterBar = ({ selectedFilter, onFilterChange, onDownload }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap gap-2">
        {FILTER_TYPES.map((filter) => (
          <Button
            key={filter}
            variant={selectedFilter === filter ? 'primary' : 'ghost'}
            onClick={() => onFilterChange(filter)}
          >
            {labelMap[filter]}
          </Button>
        ))}
      </div>
      <Button variant="success" size="lg" onClick={onDownload}>
        <Download className="w-5 h-5" />
        Download Report
      </Button>
    </div>
  </div>
);

export default FilterBar;
