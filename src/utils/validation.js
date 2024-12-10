export const validateUser = (values) => {
  const errors = {};


  if (!values.name) {
    errors.name = 'Name is required';
  } else if (values.name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }


  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }


  if (!values.id && !values.password) {
    errors.password = 'Password is required';
  } else if (values.password && values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  } else if (values.password && !/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(values.password)) {
    errors.password = 'Password must contain uppercase, lowercase and numbers';
  }

  if (!values.role) {
    errors.role = 'Role is required';
  }

  return errors;
}; 