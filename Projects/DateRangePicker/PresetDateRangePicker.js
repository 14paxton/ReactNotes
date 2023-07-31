import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import DateRangePicker from '../../../../common/DatePicker/DateRangePicker';
import { useFormContext } from 'react-hook-form';
import CurrentUserContext from '../../../../common/context/CurrentUserContext';
import { getPreferredDateFormat } from '../../../../common/util/usePreferredDateFormat';
import { useFormatMessage } from '../../../../i18n/i18n.util';

const today = moment();
const yesterday = moment().subtract(1, 'day');
const lastWeek = moment().subtract(7, 'day');
const lastMonth = moment().subtract(30, 'day');
const lastYear = moment().subtract(365, 'day');

const startOfMonth = moment().startOf('month');
const endOfMonth = moment().endOf('month');

const lastmonthlastdate = moment().subtract(1, 'months').startOf('month');
const lastmonthfirstdate = moment().subtract(1, 'months').endOf('month');

const PresetDateRangePicker = ({
  formData,
  dateRangeChange,
  handleAdvTextFieldChange
}) => {
  const [startDate, setStartDate] = useState(
    formData?.orderDateRange?.startDate ?? lastYear
  );
  const [endDate, setEndDate] = useState(
    formData?.orderDateRange?.endDate ?? today
  );
  const { setValue, register } = useFormContext();
  const { user } = useContext(CurrentUserContext);
  const presets = [
    {
      text: useFormatMessage(
        'groups.create.group.modal.results.table.advanced.search.daterange.preset.today',
        'Today'
      ),
      start: today,
      end: today
    },
    {
      text: useFormatMessage(
        'groups.create.group.modal.results.table.advanced.search.daterange.preset.yesterday',
        'Yesterday'
      ),
      start: yesterday,
      end: today
    },
    {
      text: useFormatMessage(
        'groups.create.group.modal.results.table.advanced.search.daterange.preset.lastweek',
        'Last 7 Days'
      ),
      start: lastWeek,
      end: today
    },
    {
      text: useFormatMessage(
        'groups.create.group.modal.results.table.advanced.search.daterange.preset.last.thirty',
        'Last 30 Days'
      ),
      start: lastMonth,
      end: today
    },
    {
      text: useFormatMessage(
        'groups.create.group.modal.results.table.advanced.search.daterange.preset.this.month',
        'This Month'
      ),
      start: startOfMonth,
      end: endOfMonth
    },
    {
      text: useFormatMessage(
        'groups.create.group.modal.results.table.advanced.search.daterange.last.month',
        'Last Month'
      ),
      start: lastmonthlastdate,
      end: lastmonthfirstdate
    },
    {
      text: useFormatMessage(
        'groups.create.group.modal.results.table.advanced.search.daterange.preset.last.year',
        'Last Year'
      ),
      start: lastYear,
      end: today
    }
  ];

  register(`orderDateRange`);

  useEffect(() => {
    setValue('orderDateRange', formData?.orderDateRange);
    setStartDate(formData?.orderDateRange?.startDate ?? lastYear);
    setEndDate(formData?.orderDateRange?.endDate ?? today);
  }, [formData, setValue]);

  const handleManualDateChange = (startDate, endDate) => {
    if (startDate && endDate) {
      setStartDate(startDate);
      setEndDate(endDate);

      const dateRange = { startDate: startDate, endDate: endDate };
      setValue('orderDateRange', dateRange);
      dateRangeChange(dateRange);
      handleAdvTextFieldChange();
    }
  };

  const handlePresetDateChange = (startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);
    const dateRange = { startDate: startDate, endDate: endDate };

    setValue('orderDateRange', dateRange);
    dateRangeChange(dateRange);
    handleAdvTextFieldChange();
  };

  return (
    <DateRangePicker
      presets={presets}
      initialEndDate={endDate}
      initialStartDate={startDate}
      small={true}
      initialVisibleMonth={() => moment(endDate).subtract(1, 'M')}
      hideKeyboardShortcutsPanel={true}
      noBorder={true}
      handleManualDateChange={handleManualDateChange}
      handlePresetDateChange={handlePresetDateChange}
      displayFormat={getPreferredDateFormat(user)}
    />
  );
};

export default PresetDateRangePicker;
