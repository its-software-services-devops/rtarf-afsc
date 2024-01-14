import { QSpinnerGears } from "quasar";
export const useLoadingShow = () => {
  Loading.show({
    spinner: QSpinnerGears,
    message: "ระบบกำลังดำเนินการ...",
  });
};
export const useLoadingHide = () => {
  Loading.hide();
};
