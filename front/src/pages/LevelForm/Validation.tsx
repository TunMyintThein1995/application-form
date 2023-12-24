import * as yup from "yup";
import { errorMsg } from '../../utils/Helpers/Messages';


export const validationSchema = yup.object().shape({
  exam_date: yup.string()
    .required(errorMsg.required),
  level: yup.string()
    .required(errorMsg.required),
  count: yup.string()
    .required(errorMsg.required),
  start_date: yup.string()
    .required(errorMsg.required),
  end_date: yup.string()
    .required(errorMsg.required),
});