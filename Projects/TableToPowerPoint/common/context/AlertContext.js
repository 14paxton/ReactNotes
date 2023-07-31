import React from 'react';

export default React.createContext({
  alert: {
    open: false,
    variant: 'success',
    message: 'Success: Your Profile has been updated',
    duration: 5000
  },
  showAlert: () => {},
  closeAlert: () => {}
});
