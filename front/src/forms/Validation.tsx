import * as yup from "yup";
import { errorMsg } from '../utils/Helpers/Messages';


export const validationSchema = yup.object().shape({
  name: yup.string()
    .required(errorMsg.required),
  email: yup.string()
    .required(errorMsg.required),
  level: yup.string()
    .required(errorMsg.required),
  date_of_birth: yup.string()
    .required(errorMsg.required),
  phone: yup.string()
    .required(errorMsg.required),
  viber_no: yup.string()
    .required(errorMsg.required),
  application_form: yup.mixed()
    .test('required', 'Application Form is required*', value => {
      return value && value.length;
    }),
  id_card: yup.mixed()
    .test('required', 'ID Card is required*', value => {
      return value && value.length;
    }),
  photo: yup.mixed()
    .test('required', 'Photo is required*', value => {
      return value && value.length;
    }),
  agree: yup.boolean()
    .oneOf([true], 'Please agree our Terms'),
});