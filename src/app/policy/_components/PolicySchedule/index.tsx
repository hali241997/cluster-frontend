"use client";

import { CheckboxField } from "@/components/CheckboxField";
import { SelectField, SelectFieldOption } from "@/components/SelectField";
import { showFieldError } from "@/utils/form";
import { FormikErrors, FormikTouched } from "formik";
import { ChangeEvent, FC, useCallback } from "react";
import { RiQuestionFill } from "react-icons/ri";
import { FormInputs, scheduleOptions, SnapshotRunningDays } from "../../form";
import { DeleteSnapshotField } from "../DeleteSnapshotField";
import { TimeFormatField } from "../TimeFormatField";

export interface PolicyScheduleProps {
  values: FormInputs;
  touched: FormikTouched<FormInputs>;
  errors: FormikErrors<FormInputs>;
  setFieldValue: (
    field: string,
    value: unknown,
    shouldValidate?: boolean
  ) => Promise<void> | Promise<FormikErrors<FormInputs>>;
}

export const PolicySchedule: FC<PolicyScheduleProps> = ({
  values,
  touched,
  errors,
  setFieldValue,
}) => {
  const onScheduleTypeOptionSelect = useCallback(
    (option: SelectFieldOption) => {
      setFieldValue("scheduleType", option);
    },
    [setFieldValue]
  );

  const handleRunnDaysChange = useCallback(
    (key: keyof SnapshotRunningDays, checked: boolean) => {
      if (checked && key === "everyDay") {
        setFieldValue("runningDays.monday", false);
        setFieldValue("runningDays.tuesday", false);
        setFieldValue("runningDays.wednesday", false);
        setFieldValue("runningDays.thursday", false);
        setFieldValue("runningDays.friday", false);
        setFieldValue("runningDays.saturday", false);
        setFieldValue("runningDays.sunday", false);
      } else if (checked && key !== "everyDay") {
        setFieldValue("runningDays.everyDay", false);
      }
      setFieldValue(`runningDays.${key}`, checked);
    },
    [setFieldValue]
  );

  return (
    <div className="mb-11">
      <div className="text-lg mb-[6px]">
        Run Policy on the Following Schedule
      </div>

      <div className="grid grid-cols-12 bg-[#242C35] border-t-[#3D454DCC] border-t-[1px] px-6 py-9 space-x-6">
        <div className="col-span-3 flex flex-col items-end space-y-[18px]">
          <div className="h-9 flex items-center text-lg text-[#C7CACC]">
            Select Schedule Type
          </div>
          <div className="h-9 flex items-center text-lg text-[#C7CACC]">
            Set to Time Zone
          </div>
          <div className="h-9 flex items-center text-lg text-[#C7CACC]">
            Take a Snapshot at
          </div>
          <div className="h-9 flex items-center text-lg text-[#C7CACC]">
            On the Following Day(s)
          </div>
          <div className="h-9 flex items-center text-lg text-[#C7CACC]">
            Delete Each Snapshot
          </div>
        </div>

        <div className="col-span-9 flex flex-col space-y-[18px]">
          <SelectField
            id="scheduleType"
            options={scheduleOptions}
            innerClassName="h-9"
            selectedOption={values.scheduleType}
            fieldClassName="w-[230px] text-lg bg-[#424B5366]"
            setSelectedOption={onScheduleTypeOptionSelect}
            error={showFieldError(touched.scheduleType, errors.scheduleType)}
          />

          <div className="h-9 flex items-center text-lg text-[#C7CACC]">
            America/Los Angeles
            <RiQuestionFill
              size={20}
              fill="rgba(2, 152, 255, 1)"
              className="ml-2"
            />
          </div>

          <TimeFormatField
            takeSnapshotAt={values.takeSnapshotAt}
            setFieldValue={setFieldValue}
            error={showFieldError(
              touched.takeSnapshotAt,
              errors.takeSnapshotAt
            )}
          />

          <div>
            <div className="h-9 flex items-center gap-6">
              <CheckboxField
                id="everyDay"
                label="Every day"
                checked={values.runningDays.everyDay}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleRunnDaysChange("everyDay", event.target.checked)
                }
              />
              <CheckboxField
                id="monday"
                label="Mon"
                checked={values.runningDays.monday}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleRunnDaysChange("monday", event.target.checked)
                }
              />
              <CheckboxField
                id="tuesday"
                label="Tue"
                checked={values.runningDays.tuesday}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleRunnDaysChange("tuesday", event.target.checked)
                }
              />
              <CheckboxField
                id="wednesday"
                label="Wed"
                checked={values.runningDays.wednesday}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleRunnDaysChange("wednesday", event.target.checked)
                }
              />
              <CheckboxField
                id="thursday"
                label="Thur"
                checked={values.runningDays.thursday}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleRunnDaysChange("thursday", event.target.checked)
                }
              />
              <CheckboxField
                id="friday"
                label="Fri"
                checked={values.runningDays.friday}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleRunnDaysChange("friday", event.target.checked)
                }
              />
              <CheckboxField
                id="saturday"
                label="Sat"
                checked={values.runningDays.saturday}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleRunnDaysChange("saturday", event.target.checked)
                }
              />
              <CheckboxField
                id="sunday"
                label="Sun"
                checked={values.runningDays.sunday}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleRunnDaysChange("sunday", event.target.checked)
                }
              />
            </div>
            {showFieldError(touched.runningDays, errors.runningDays) && (
              <span className="text-red-500 mt-2">
                showFieldError(touched.runningDays, errors.runningDays)
              </span>
            )}
          </div>

          <DeleteSnapshotField
            deleteSnapshot={values.deleteSnapshot}
            deleteSnapshotCount={values.deleteSnapshotCount}
            deleteSnapshotRecurrence={values.deleteSnapshotRecurrence}
            touched={touched}
            errors={errors}
            setFieldValue={setFieldValue}
          />
        </div>
      </div>

      {/* <div className="bg-[#242C35] flex border-t-[#3D454DCC] border-t-[1px] px-6 py-9 gap-6">
        <div className="w-[14%] flex flex-col items-end gap-[18px]">
          <div className="h-9 flex items-center text-lg text-[#C7CACC]">
            Select Schedule Type
          </div>
          <div className="h-9 flex items-center text-lg text-[#C7CACC]">
            Set to Time Zone
          </div>
          <div className="h-9 flex items-center text-lg text-[#C7CACC]">
            Take a Snapshot at
          </div>
          <div className="h-9 flex items-center text-lg text-[#C7CACC]">
            On the Following Day(s)
          </div>
          <div className="h-9 flex items-center text-lg text-[#C7CACC]">
            Delete Each Snapshot
          </div>
        </div>

        <div className="flex flex-col gap-[18px]">
          <SelectField
            id="scheduleType"
            options={scheduleOptions}
            innerClassName="h-9"
            selectedOption={values.scheduleType}
            fieldClassName="w-[230px] text-lg bg-[#424B5366]"
            setSelectedOption={onScheduleTypeOptionSelect}
            error={showFieldError(touched.scheduleType, errors.scheduleType)}
          />

          <div className="h-9 flex items-center text-lg text-[#C7CACC]">
            America/Los Angeles
            <RiQuestionFill
              size={20}
              fill="rgba(2, 152, 255, 1)"
              className="ml-2"
            />
          </div>

          <TimeFormatField
            takeSnapshotAt={values.takeSnapshotAt}
            setFieldValue={setFieldValue}
            error={showFieldError(
              touched.takeSnapshotAt,
              errors.takeSnapshotAt
            )}
          />

          <div>
            <div className="h-9 flex items-center gap-6">
              <CheckboxField
                id="everyDay"
                label="Every day"
                checked={values.runningDays.everyDay}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleRunnDaysChange("everyDay", event.target.checked)
                }
              />
              <CheckboxField
                id="monday"
                label="Mon"
                checked={values.runningDays.monday}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleRunnDaysChange("monday", event.target.checked)
                }
              />
              <CheckboxField
                id="tuesday"
                label="Tue"
                checked={values.runningDays.tuesday}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleRunnDaysChange("tuesday", event.target.checked)
                }
              />
              <CheckboxField
                id="wednesday"
                label="Wed"
                checked={values.runningDays.wednesday}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleRunnDaysChange("wednesday", event.target.checked)
                }
              />
              <CheckboxField
                id="thursday"
                label="Thur"
                checked={values.runningDays.thursday}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleRunnDaysChange("thursday", event.target.checked)
                }
              />
              <CheckboxField
                id="friday"
                label="Fri"
                checked={values.runningDays.friday}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleRunnDaysChange("friday", event.target.checked)
                }
              />
              <CheckboxField
                id="saturday"
                label="Sat"
                checked={values.runningDays.saturday}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleRunnDaysChange("saturday", event.target.checked)
                }
              />
              <CheckboxField
                id="sunday"
                label="Sun"
                checked={values.runningDays.sunday}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleRunnDaysChange("sunday", event.target.checked)
                }
              />
            </div>
            {showFieldError(touched.runningDays, errors.runningDays) && (
              <span className="text-red-500 mt-2">
                showFieldError(touched.runningDays, errors.runningDays)
              </span>
            )}
          </div>

          <DeleteSnapshotField
            deleteSnapshot={values.deleteSnapshot}
            deleteSnapshotCount={values.deleteSnapshotCount}
            deleteSnapshotRecurrence={values.deleteSnapshotRecurrence}
            touched={touched}
            errors={errors}
            setFieldValue={setFieldValue}
          />
        </div>
      </div> */}
    </div>
  );
};
