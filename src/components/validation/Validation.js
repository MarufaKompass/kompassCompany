import * as yup from 'yup';
const phoneRegExp = /(^([+]{1}[8]{2}|0088)?(01){1}[3-9]{1}\d{8})$/;
const emailValidation = yup.string().email().required('Email is required');
const titleEvent = yup.string().required('Title is required');
const phoneValidation = yup.string().required('Phone number is required').max(11).min(11).matches(phoneRegExp, 'Phone number is not valid');
const firstName = yup.string().required('First Name is  required');
const lastName = yup.string().required('Last Name is  required');
const genderValidation = yup.string().required('Gender is required');
const passwordValidation = yup.string().required('Password is required');
const dobValidation = yup.string().required('Date Of Birth is required');
const dateValidation = yup.string().required('Date is required');
const start_time = yup.string().required('Starting time is required');
const end_time = yup.string().required('Ending time is required');
const timeValidation = yup.string().required('Time is required');
const locationValidation = yup.string().required('Address is required');
const details = yup.string().required('Details is required');
const purposeValidation = yup.string().required('Purpose is required');
const leaveTypeValidation = yup.string().required('Leave Type is required');
const startDateValidation = yup.string().required('Starting Day is required');
const endDateValidation = yup.string().required('Ending Day is required');
const reasonValidation = yup.string().required('Reason is required');
const expectedDaysValidation = yup.string().required('Expected Days is required');
const applyAmountValidation = yup.string().required('Apply Amount is required');
const amountValidation = yup.string().required('Amount is required');
const referenceValidation = yup.string().required('Reference is required');
const emiLengthValidation = yup.string().required('Emi Length is required');
const loanTypeValidation = yup.string().required('Loan Type is required');
const eventType = yup.string().required('Event Type is required');
const intimeValidation = yup.string().required('In Time is required');
const outtimeValidation = yup.string().required('Out Time is required');
const typeValidation = yup.string().required('Type is required');

export const registration = yup.object().shape({
  first_name: firstName,
  last_name: lastName,
  phone: phoneValidation,
  email: emailValidation,
  gender: genderValidation,
  dob: dobValidation,
  password: passwordValidation
});
export const addMeetings = yup.object().shape({
  phone: phoneValidation
});

export const addForm = yup.object().shape({
  date: dateValidation,
  time: timeValidation,
  purpose_id: purposeValidation,
  location: locationValidation
});

export const editAdd = yup.object().shape({
  title: titleEvent,
  start_time: start_time,
  end_time: end_time,
  location: locationValidation,
  date: dateValidation,
  details: details,
  evnt_type_id: eventType
});

export const singleInvite = yup.object().shape({
  phone: phoneValidation
});

export const visitorPage = yup.object().shape({
  first_name: firstName,
  last_name: lastName,
  phone: phoneValidation,
  email: emailValidation,
  gender: genderValidation
});

export const leavePage = yup.object().shape({
  leave_category: leaveTypeValidation,
  fromdate: startDateValidation,
  todate: endDateValidation,
  leave_note: reasonValidation
});

export const earnWagePage = yup.object().shape({
  leave_category: expectedDaysValidation,
  apply_amount: applyAmountValidation
});

export const iouPage = yup.object().shape({
  amount: amountValidation
});

export const iouApplicationPage = yup.object().shape({
  date: dateValidation,
  amount: amountValidation,
  ref: referenceValidation
});

export const loanPage = yup.object().shape({
  emi_length: emiLengthValidation,
  amount: amountValidation,
  loan_type_id: loanTypeValidation
});

export const attendanceClaim = yup.object().shape({
  date: dateValidation,
  intime: intimeValidation,
  outtime: outtimeValidation
});
export const forget = yup.object().shape({
  phone: phoneValidation
});

export const scheduleValidation = yup.object().shape({
  date: dateValidation,
  start_time: start_time,
  end_time: end_time,
  type: typeValidation
});
