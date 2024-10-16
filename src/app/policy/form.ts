import { RadioGroupOption } from "@/components/RadioGroupField";
import { SelectFieldOption } from "@/components/SelectField";
import { ErrorMessages } from "@/utils/form";
import { boolean, number, object, string } from "yup";

export const scheduleOptions: Array<SelectFieldOption> = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
];

export const deleteSnapshotOptions: Array<RadioGroupOption> = [
  { value: "never", label: "Never" },
  { value: "auto", label: "Automatically after" },
];

export const recurringOptions: Array<SelectFieldOption> = [
  { value: "days", label: "day(s)" },
  { value: "weeks", label: "week(s)" },
  { value: "months", label: "month(s)" },
  { value: "years", label: "year(s)" },
];

export interface FormInputs {
  policyName: string;
  applyToDirectory: string;
  scheduleType: SelectFieldOption;
  takeSnapshotAt: string;
  runningDays: SnapshotRunningDays;
  deleteSnapshot: RadioGroupOption;
  deleteSnapshotCount: number;
  deleteSnapshotRecurrence: SelectFieldOption;
  enableLockedSnapshot: boolean;
  enablePolicy: boolean;
}

export interface SnapshotRunningDays {
  everyDay: boolean;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
}

export const initialValues: FormInputs = {
  policyName: "ProjectX_Daily",
  applyToDirectory: "Production/ProjectX",
  scheduleType: scheduleOptions[0],
  takeSnapshotAt: "00:00",
  runningDays: {
    everyDay: false,
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: false,
  },
  deleteSnapshot: deleteSnapshotOptions[0],
  deleteSnapshotCount: 99,
  deleteSnapshotRecurrence: recurringOptions[0],
  enableLockedSnapshot: false,
  enablePolicy: false,
};

export const formValidation = object().shape({
  policyName: string().trim().required(ErrorMessages.required("Policy Name")),
  applyToDirectory: string()
    .trim()
    .required(ErrorMessages.required("Directory Name")),
  scheduleType: object().required(ErrorMessages.required("Schedule Type")),
  takeSnapshotAt: string().trim().required(ErrorMessages.required("Time")),
  runningDays: object().test(
    "at-least-one-checked",
    (obj) => obj && Object.values(obj).some((value) => value === true)
  ),
  deleteSnapshot: object().required(
    ErrorMessages.required("Snapshot Interval")
  ),
  deleteSnapshotCount: number().nullable(),
  deleteSnapshotRecurrence: object().nullable(),
  enableLockedSnapshot: boolean(),
  enablePolicy: boolean(),
});
