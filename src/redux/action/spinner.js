import { SPINNER_OFF, SPINNER_ON } from "../constant/spinner";

export const turnOnLoadingAction = () => ({
  type: SPINNER_ON,
});
export const turnOffLoadingAction = () => ({
  type: SPINNER_OFF,
});
