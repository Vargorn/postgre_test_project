import { format } from 'date-fns';

export const formatDate = (date) => {
  return format(new Date(date), 'MMM d, yyyy');
};

export const formatDateTime = (date) => {
  return format(new Date(date), 'MMM d, yyyy h:mm a');
};
