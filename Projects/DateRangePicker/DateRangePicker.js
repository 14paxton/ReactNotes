import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import moment from 'moment';
import omit from 'lodash/omit';

import 'react-dates/initialize';
import './CustomDateRangePicker.css';
// import 'react-dates/lib/css/_datepicker.css';
import { css, withStyles, withStylesPropTypes } from 'react-with-styles';

import { DateRangePicker, DateRangePickerShape } from 'react-dates';

import { DateRangePickerPhrases } from 'react-dates/src/defaultPhrases';
import { ANCHOR_LEFT, END_DATE, HORIZONTAL_ORIENTATION, START_DATE } from 'react-dates/src/constants';
import isSameDay from 'react-dates/src/utils/isSameDay';

const DateRangePickerWrapper = (props) => {
  const {
    autoFocus,
    autoFocusEndDate,
    initialStartDate,
    initialEndDate,
    handleManualDateChange,
    handlePresetDateChange
  } = props;
  const [focusedInput, setFocusedInput] = useState();
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);

  useEffect(() => {
    if (autoFocus) {
      setFocusedInput(START_DATE);
    } else if (autoFocusEndDate) {
      setFocusedInput(END_DATE);
    }
  }, [autoFocus, autoFocusEndDate]);

  const onDatesChange = ({ startDate, endDate }) => {
    handlePresetDateChange(startDate, endDate);
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const onFocusChange = (focusedInput) => {
    setFocusedInput(focusedInput);
  };

  const renderDatePresets = () => {
    const { presets, styles } = props;

    return (
      <div {...css(styles.PresetDateRangePicker_panel)}>
        {presets.map(({ text, start, end }) => {
          const isSelected =
            isSameDay(start, startDate) && isSameDay(end, endDate);
          return (
            <button
              key={text}
              {...css(
                styles.PresetDateRangePicker_button,
                isSelected && styles.PresetDateRangePicker_button__selected
              )}
              type="button"
              onClick={() => onDatesChange({ startDate: start, endDate: end })}
            >
              {text}
            </button>
          );
        })}
      </div>
    );
  };

  const customProps = [
    'autoFocus',
    'autoFocusEndDate',
    'initialStartDate',
    'initialEndDate',
    'presets',
    'handlePresetDateChange',
    'handleManualDateChange'
  ];

  const defaultProps = Object.fromEntries(
    Object.entries(props).filter(([k, v]) => !customProps.includes(k))
  );

  return (
    <div>
      <DateRangePicker
        {...defaultProps}
        renderCalendarInfo={renderDatePresets}
        onDatesChange={({ startDate, endDate }) => {
          setStartDate(startDate);
          setEndDate(endDate);
          handleManualDateChange(startDate, endDate);
        }}
        onFocusChange={onFocusChange}
        focusedInput={focusedInput}
        startDate={startDate}
        endDate={endDate}
      />
    </div>
  );
};

DateRangePickerWrapper.propTypes = {
  ...withStylesPropTypes,
  autoFocus: PropTypes.bool,
  autoFocusEndDate: PropTypes.bool,
  initialStartDate: momentPropTypes.momentObj,
  initialEndDate: momentPropTypes.momentObj,
  presets: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      start: momentPropTypes.momentObj,
      end: momentPropTypes.momentObj
    })
  ),

  ...omit(DateRangePickerShape, [
    'startDate',
    'endDate',
    'onDatesChange',
    'focusedInput',
    'onFocusChange',
    'handleManualDateChange',
    'handlePresetDateChange'
  ])
};
DateRangePickerWrapper.defaultProps = {
  autoFocus: false,
  autoFocusEndDate: false,
  initialStartDate: null,
  initialEndDate: null,
  presets: [],

  // input related props
  startDateId: START_DATE,
  startDatePlaceholderText: 'Start Date',
  endDateId: END_DATE,
  endDatePlaceholderText: 'End Date',
  disabled: false,
  required: false,
  screenReaderInputMessage: '',
  showClearDates: false,
  showDefaultInputIcon: false,
  customInputIcon: null,
  customArrowIcon: null,
  customCloseIcon: null,

  // calendar presentation and interaction related props
  renderMonthText: null,
  orientation: HORIZONTAL_ORIENTATION,
  anchorDirection: ANCHOR_LEFT,
  horizontalMargin: 0,
  withPortal: false,
  withFullScreenPortal: false,
  initialVisibleMonth: null,
  numberOfMonths: 2,
  keepOpenOnDateSelect: false,
  reopenPickerOnClearDates: false,
  isRTL: false,

  // navigation related props
  navPrev: null,
  navNext: null,
  onPrevMonthClick() {},
  onNextMonthClick() {},
  onClose() {},

  // day presentation and interaction related props
  renderDayContents: null,
  minimumNights: 0,
  enableOutsideDays: false,
  isDayBlocked: () => false,
  isOutsideRange: (day) => false,
  isDayHighlighted: () => false,

  // internationalization
  displayFormat: () => moment.localeData().longDateFormat('L'),
  monthFormat: 'MMMM YYYY',
  phrases: DateRangePickerPhrases
};

export default withStyles(({ reactDates: { color } }) => ({
  PresetDateRangePicker_panel: {
    padding: '0 22px 11px 22px'
  },

  PresetDateRangePicker_button: {},

  PresetDateRangePicker_button__selected: {
    color: color.core.white,
    background: color.core.primary
  }
}))(DateRangePickerWrapper);
