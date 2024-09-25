import React, { memo } from 'react';
import PropTypes from 'prop-types';

const STATUS_ICONS = {
  sent: '✓',
  delivered: '✓✓', 
  seen: '✓✓', 
};

const MessageStatus = ({ status }) => {
  return (
    <span
      className={`${status === 'seen' ? 'text-blue-500': 'text-gray-400'} text-[10px] tracking-tighter inline-block float-end ms-1`}
    >
      {STATUS_ICONS[status] || ''}
    </span>
  );
};

MessageStatus.propTypes = {
  status: PropTypes.oneOf(['sent', 'delivered', 'seen']).isRequired,
};

export default memo(MessageStatus);