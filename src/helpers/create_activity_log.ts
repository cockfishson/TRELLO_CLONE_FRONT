import { AppDispatch } from "../redux/store";
import { createActivityLog } from "../redux/slices/activityLogSlice";

export const logActivity = (
  dispatch: AppDispatch,
  action_type: string,
  action_details: string,
) => {
  dispatch(
    createActivityLog({
      action_type,
      action_details,
    }),
  );
};
