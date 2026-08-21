"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

const FormSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(5, "The password cannot be less than 5 symbols"),
  passwordConfirm: z.string(),
});

type FormInput = z.infer<typeof FormSchema>;

export default function IndexPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({});

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    console.log("The form was submitted.");
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="container mx-auto px-4 py-2">
        <div className="bg-white rounded-md outline outline-stone-100 shadow p-5">
          {/* Form Itself */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Username */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Username</legend>
              <input
                className="input w-full"
                type="text"
                placeholder="Your username here..."
                {...(register("username"),
                {
                  required: true,
                })}
              />
              <p className="fieldset-label">{errors.username?.message}</p>
            </fieldset>

            {/* Email */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email</legend>
              <input
                className="input w-full"
                type="email"
                placeholder="somemail@gmail.com"
                {...(register("email"),
                {
                  required: true,
                })}
              />
              <p className="fieldset-label">{errors.email?.message}</p>
            </fieldset>

            {/* Password */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                className="input w-full"
                type="password"
                {...(register("password"), { required: true })}
              />
              <p className="fieldset-label">{errors.password?.message}</p>
            </fieldset>

            {/* Password Cofirm */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Username</legend>
              <input
                className="input w-full"
                type="password"
                {...(register("passwordConfirm"), { required: true })}
              />
              <p className="fieldset-label">
                {errors.passwordConfirm?.message}
              </p>
            </fieldset>

            <button type="submit" className="btn w-full">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
