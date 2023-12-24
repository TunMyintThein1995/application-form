import * as yup from "yup";
import { errorMsg } from '../../utils/Helpers/Messages';


export const validationSchema = yup.object().shape({
  email: yup.string()
    .required(errorMsg.required),
  phone: yup.string()
    .required(errorMsg.required),
  password: yup.string()
    .required(errorMsg.required),
});