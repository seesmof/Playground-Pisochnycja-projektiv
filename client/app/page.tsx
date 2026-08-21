export default function IndexPage() {
  return (
    <div className="min-h-screen bg-sky-50">
      <div className="container mx-auto px-4 py-2">
        <div className="bg-white rounded-md shadow p-5">
          <h1 className="font-bold text-2xl">A Simple Login Form</h1>
          <p className="py-4 mb-4">This is a simple login form.</p>
          <form>
            <fieldset className="fieldset">
              <label htmlFor="usernameInput" className="label">
                Username
              </label>
              <input
                type="text"
                className="input w-full"
                placeholder="Your username here..."
              />
            </fieldset>
            <fieldset className="fieldset mt-2">
              <label htmlFor="passwordInput" className="label">
                Password
              </label>
              <input type="password" className="input w-full" />
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
