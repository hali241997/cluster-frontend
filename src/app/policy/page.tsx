"use client";

import { Button } from "@/components/Button";
import { CheckboxField } from "@/components/CheckboxField";
import { DirectoryField } from "@/components/DirectoryField";
import { TextField } from "@/components/TextField";
import { showFieldError } from "@/utils/form";
import { useFormik } from "formik";
import { ChangeEvent, FC, useCallback } from "react";
import { PolicySchedule } from "./_components/PolicySchedule";
import { SnapshotLocking } from "./_components/SnapshotLocking";
import { FormInputs, formValidation, initialValues } from "./form";

const Policy: FC = () => {
  const formik = useFormik({
    initialValues,
    validationSchema: formValidation,
    onSubmit: (values: FormInputs) => {
      console.log({ values });
    },
  });

  const handleEnablePolicyChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      formik.setFieldValue("enablePolicy", event.target.checked);
    },
    [formik]
  );

  return (
    <form action={() => formik.handleSubmit()}>
      <div className="py-3 pl-4">
        <div className="text-xl leading-8 font-light text-[#F3F4F4] mb-5">
          Edit Snapshot Policy
        </div>

        <div className="w-[793px] space-y-3 mb-3">
          <TextField
            id="policyName"
            label="Policy Name"
            required
            value={formik.values.policyName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={showFieldError(
              formik.touched.policyName,
              formik.errors.policyName
            )}
          />

          <DirectoryField
            id="applyToDirectory"
            label="Apply to Directory"
            required
            value={formik.values.applyToDirectory}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={showFieldError(
              formik.touched.applyToDirectory,
              formik.errors.applyToDirectory
            )}
          />
        </div>

        <PolicySchedule
          values={formik.values}
          touched={formik.touched}
          errors={formik.errors}
          setFieldValue={formik.setFieldValue}
        />

        <SnapshotLocking
          enableLockedSnapshot={formik.values.enableLockedSnapshot}
          deleteSnapshot={formik.values.deleteSnapshot}
          touched={formik.touched}
          errors={formik.errors}
          setFieldValue={formik.setFieldValue}
        />

        <CheckboxField
          id="enablePolicy"
          label="Enable policy"
          containerClassName="mb-[27px]"
          checked={formik.values.enablePolicy}
          onChange={handleEnablePolicyChange}
          error={showFieldError(
            formik.touched.enablePolicy,
            formik.errors.enablePolicy
          )}
        />

        <div className="space-x-[14px]">
          <Button type="submit">Save Policy</Button>
          <Button variant="ghost">Cancel</Button>
        </div>
      </div>
    </form>
  );
};

export default Policy;
