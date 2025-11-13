import { useEffect, useMemo, useState, useCallback } from 'react';
import { FILTER_TYPES } from '../constants.js';
import { fetchRecords, createRecord, deleteRecord as deleteRecordAPI } from '../services/apiService.js';
import { filterRecords } from '../utils/filterRecords.js';

const normalizeRecord = (rawRecord) => {
  if (!rawRecord) return null;

  const now = Date.now();
  const timestamp = typeof rawRecord.timestamp === 'number' ? rawRecord.timestamp : now;
  const name =
    typeof rawRecord.userName === 'string'
      ? rawRecord.userName.trim()
      : typeof rawRecord.name === 'string'
      ? rawRecord.name.trim()
      : '';

  if (!name) return null;

  const deriveDate = () => new Date(timestamp).toLocaleDateString('en-IN');
  const deriveTime = () => new Date(timestamp).toLocaleTimeString('en-IN');
  const fallbackId = name.toLowerCase().replace(/\s+/g, '-');
  const userIdSource =
    rawRecord.userId ??
    rawRecord.id ??
    (fallbackId ? fallbackId : `member-${timestamp}`);

  return {
    userName: name,
    userId: userIdSource,
    loginDate: rawRecord.loginDate ?? rawRecord.date ?? deriveDate(),
    loginTime: rawRecord.loginTime ?? rawRecord.time ?? deriveTime(),
    timestamp
  };
};

const normalizeRecords = (records) => {
  if (!Array.isArray(records)) return [];
  return records
    .map((record) => normalizeRecord(record))
    .filter((record) => record !== null)
    .sort((a, b) => a.timestamp - b.timestamp);
};

const useAttendance = () => {
  const [records, setRecords] = useState([]);
  const [filterType, setFilterType] = useState(FILTER_TYPES[0]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;
    let isFirstLoad = true;

    const loadRecords = async () => {
      try {
        const storedRecords = await fetchRecords();
        if (!isActive) return;
        setRecords(normalizeRecords(storedRecords));
        isFirstLoad = false;
      } catch (error) {
        console.error('Failed to load records:', error);
        if (!isActive) return;
        // Only set empty on first load error, keep existing records on subsequent errors
        if (isFirstLoad) {
          setRecords([]);
          isFirstLoad = false;
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    loadRecords();

    // Poll for updates every 5 seconds
    const interval = setInterval(() => {
      if (isActive) {
        loadRecords();
      }
    }, 5000);

    return () => {
      isActive = false;
      clearInterval(interval);
    };
  }, []);

  const markAttendance = useCallback(
    async ({ name }) => {
      const trimmedName = name.trim();
      if (!trimmedName) {
        throw new Error('Name is required');
      }

      try {
        const newRecord = await createRecord(trimmedName);
        setRecords((current) => {
          const updated = [...current, normalizeRecord(newRecord)];
          return normalizeRecords(updated);
        });
        return newRecord;
      } catch (error) {
        console.error('Failed to mark attendance:', error);
        const errorMessage = error.message || 'Failed to mark attendance. Please try again.';
        alert(errorMessage);
        throw error;
      }
    },
    []
  );

  const deleteRecord = useCallback(
    async (timestamp) => {
      try {
        await deleteRecordAPI(timestamp);
        setRecords((current) => {
          const filtered = current.filter((record) => record.timestamp !== timestamp);
          return normalizeRecords(filtered);
        });
      } catch (error) {
        console.error('Failed to delete record:', error);
        alert('Failed to delete record. Please try again.');
      }
    },
    []
  );

  const filteredRecords = useMemo(
    () => filterRecords(records, filterType),
    [records, filterType]
  );

  const totalMembers = useMemo(() => {
    const uniqueNames = new Set(
      records
        .map((record) => record.userName?.toLowerCase()?.trim() ?? '')
        .filter((name) => name.length > 0)
    );
    return uniqueNames.size;
  }, [records]);

  return {
    isLoading,
    records,
    filteredRecords,
    filterType,
    setFilterType,
    totalMembers,
    totalCheckins: records.length,
    markAttendance,
    deleteRecord
  };
};

export default useAttendance;
