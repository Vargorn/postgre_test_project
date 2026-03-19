import React, { useState } from 'react';
import { Filter, X, Search } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';

const StudentFilters = ({ onFilter, onClear }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    minAge: '',
    maxAge: '',
  });

  const handleApply = () => {
    onFilter(filters);
    setIsOpen(false);
  };

  const handleClear = () => {
    setFilters({ search: '', minAge: '', maxAge: '' });
    onClear();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        icon={Filter}
        onClick={() => setIsOpen(!isOpen)}
      >
        Filters
      </Button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 animate-slide-in">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <h4 className="font-medium text-gray-900">Filter Students</h4>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-4 space-y-4">
            <Input
              label="Search"
              name="search"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              icon={Search}
              placeholder="Search by name or email"
            />

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Min Age"
                name="minAge"
                type="number"
                value={filters.minAge}
                onChange={(e) => setFilters({ ...filters, minAge: e.target.value })}
                placeholder="18"
                min="1"
                max="120"
              />
              <Input
                label="Max Age"
                name="maxAge"
                type="number"
                value={filters.maxAge}
                onChange={(e) => setFilters({ ...filters, maxAge: e.target.value })}
                placeholder="25"
                min="1"
                max="120"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 px-4 py-3 bg-gray-50 border-t border-gray-200 rounded-b-lg">
            <Button variant="ghost" size="sm" onClick={handleClear}>
              Clear
            </Button>
            <Button size="sm" onClick={handleApply}>
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentFilters;