export default function Home() {
  return (
    <div className="bg-sky-50 flex items-center justify-center min-h-screen">
      <div className="bg-white border border-sky-300 p-3 rounded-md">
        <form className="flex flex-col gap-3">
          {/* Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="nameInput" className="label">
              Name
            </label>
            <input type="text" id="nameInput" className="input" />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="emailInput" className="label">
              Email
            </label>
            <input type="email" id="emailInput" className="input" />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="passwordInput" className="label">
              Password
            </label>
            <input type="password" id="passwordInput" className="input" />
          </div>

          {/* Password Confirm */}
          <div className="flex flex-col gap-2">
            <label htmlFor="passwordConfirmInput" className="label">
              Password Confirmation
            </label>
            <input
              type="password"
              id="passwordConfirmInput"
              className="input"
            />
          </div>

          <button className="btn">Submit</button>
        </form>
      </div>
    </div>
  );
}
