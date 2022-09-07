import React from 'react';

const TimeLog = () => {
  return (
    <div className="timer-container">
      <div>log below</div>
      <div className="logged-time-set">
        <div>
          <div>●</div>
          <div className="log-line"></div>
        </div>
        <ul>
          <li>start time</li>
          <li>counting time</li>
          <li>end time</li>
        </ul>
      </div>
    </div>
  );
};

export default TimeLog;
