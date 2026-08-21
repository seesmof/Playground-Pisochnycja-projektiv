"use client";

import { SubmitHandler, useForm } from "react-hook-form";

export type Inputs = {
  username: string;
  password: string;
};

export default function IndexPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);

    setValue("username", "");
    setValue("password", "");
  };

  return (
    <div className="min-h-screen bg-sky-50">
      <div className="container mx-auto px-4 py-2">
        <div className="bg-white rounded-md shadow p-5">
          <h1 className="font-bold text-2xl">A Simple Login Form</h1>
          <p className="py-4 mb-4">This is a simple login form.</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset">
              <label htmlFor="usernameInput" className="label">
                Username
              </label>
              <input
                type="text"
                className="input w-full"
                placeholder="Your username here..."
                {...register("username", {
                  validate: {
                    isNotShort: (value) =>
                      value.length >= 4 ||
                      "The username must be at least 4 characters long.",
                  },
                })}
              />
              <p className="text-error">{errors.username?.message}</p>
            </fieldset>
            <fieldset className="fieldset mt-2">
              <label htmlFor="passwordInput" className="label">
                Password
              </label>
              <input
                type="password"
                className="input w-full"
                {...register("password", {
                  validate: {
                    minLength: (value) =>
                      value.length >= 8 ||
                      "The password must be at least 8 characters long.",
                  },
                })}
              />
              <p className="text-error">{errors.password?.message}</p>
            </fieldset>
            <button type="submit" className="w-full btn mt-5">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
