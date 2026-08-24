"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export type Inputs = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export default function Page() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [passwordConfirmVisible, setPasswordConfirmVisible] =
    useState<boolean>(false);

  const handleReset = () => {
    setValue("username", "");
    setValue("email", "");
    setValue("password", "");
    setValue("passwordConfirm", "");
    setPasswordVisible(false);
    setPasswordConfirmVisible(false);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    handleReset();
  };

  return (
    <div className="bg-sky-50 min-h-screen">
      <div className="container mx-auto p-5">
        <form
          className="bg-white flex flex-col gap-5 p-5 rounded-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Username */}
          <fieldset className="flex flex-col gap-1">
            <label className="font-bold select-none" htmlFor="usernameInput">
              Username
            </label>
            <input
              id="usernameInput"
              className={`outline ${errors.username ? "outline-red-600" : "outline-stone-300"} p-2 rounded-md`}
              placeholder="Your username here..."
              type="text"
              {...register("username", {
                validate: {
                  isNotShort: (value) =>
                    value.length >= 7 ||
                    "The username must be at least 7 characters long.",
                },
              })}
            />
            {errors.username && (
              <p className="text-error text-sm">{errors.username?.message}</p>
            )}
          </fieldset>

          {/* Email */}
          <fieldset className="flex flex-col gap-1">
            <label className="font-bold select-none" htmlFor="emailInput">
              Email
            </label>
            <input
              id="emailInput"
              className={`outline ${errors.username ? "outline-red-600" : "outline-stone-300"} p-2 rounded-md`}
              placeholder="Your email address here..."
              type="email"
              {...register("email", {
                validate: {
                  isValidEmail: (value) =>
                    /\S+@\S+\.\S/.test(value) ||
                    "The email must be a valid address.",
                },
              })}
            />
            {errors.email && (
              <p className="text-error text-sm">{errors.email?.message}</p>
            )}
          </fieldset>

          {/* Password */}
          <fieldset className="flex flex-col gap-1">
            <label className="font-bold select-none" htmlFor="passwordInput">
              Password
            </label>
            <div className="flex flex-row gap-3">
              <input
                id="passwordInput"
                className={`outline ${errors.password ? "outline-red-600" : "outline-stone-300"} p-2 rounded-md flex-1`}
                type={`${passwordVisible ? "text" : "password"}`}
                {...register("password", {
                  validate: {
                    isNotShort: (value) =>
                      value.length >= 7 ||
                      "The password must be at least 7 characters long.",
                    containsLetters: (value) =>
                      /[A-Za-z]/.test(value) ||
                      "The password must contain at least one letter.",
                    containsNumber: (value) =>
                      /[\d]/.test(value) ||
                      "The password must contain at least one number.",
                  },
                })}
              />
              <button
                className="bg-sky-600 hover:bg-sky-700 rounded-md p-2"
                onClick={() => setPasswordVisible((visible) => !visible)}
                title={`${passwordVisible ? "Hide" : "Show"}`}
              >
                {passwordVisible ? "❌" : "✅"}
              </button>
            </div>
            {errors.password && (
              <p className="text-error text-sm">{errors.password?.message}</p>
            )}
          </fieldset>

          {/* Password Confirm */}
          <fieldset className="flex flex-col gap-1">
            <label
              className="font-bold select-none"
              htmlFor="passwordConfirmInput"
            >
              Password Confirm
            </label>
            <div className="flex flex-row gap-3">
              <input
                id="passwordConfirmInput"
                className={`outline ${errors.username ? "outline-red-600" : "outline-stone-300"} p-2 rounded-md flex-1`}
                placeholder="Your username here..."
                type="text"
                {...register("username", {
                  validate: {
                    isNotShort: (value) =>
                      value.length >= 7 ||
                      "The password must be at least 7 characters long.",
                    containsLetters: (value) =>
                      /[A-Za-z]/.test(value) ||
                      "The password must contain at least one letter.",
                    containsNumber: (value) =>
                      /[\d]/.test(value) ||
                      "The password must contain at least one number.",
                  },
                })}
              />
              <button
                className="bg-sky-600 hover:bg-sky-700 rounded-md p-2"
                onClick={() => setPasswordVisible((visible) => !visible)}
                title={`${passwordVisible ? "Hide" : "Show"}`}
              >
                {passwordVisible ? "❌" : "✅"}
              </button>
            </div>
            {errors.username && (
              <p className="text-error text-sm">{errors.username?.message}</p>
            )}
          </fieldset>
          <button
            type="submit"
            className="w-full bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 cursor-pointer select-none"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
