import * as yup from 'yup';

export const signInSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(8, "Password must be at least 8 digit").required('Password is required'),
});

export const signUpSchema = yup.object().shape({
  name: yup.string().min(3, 'Name must be at least 3 characters').required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(8, "Password must be at least 8 digit").required('Password is required'),
});


export function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  return formattedDate;
}

