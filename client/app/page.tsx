export default function Page() {
  return (
    <div className="min-h-screen bg-green-50">
      <div className="flex flex-col mx-auto max-w-3xl p-3">
        <div className="flex flex-row gap-5">
          {/* Artem Jones Comment */}
          <div className="flex flex-col gap-3 relative">
            <div className="rounded-xl bg-stone-900 text-white p-3 z-20">
              <p>
                I have been solving all the project ideas on roadmap.sh and I am
                surprised how far I have come from where I started.
              </p>
              <p>Highly recommended!</p>
            </div>
            <div className="flex flex-row gap-3">
              <div className="h-12 w-12 rounded-full bg-stone-200 flex items-center justify-center">
                Pic
              </div>
              <div className="flex flex-col">
                <h3>Artem Jones</h3>
                <p className="text-sm">Junior Frontend Developer</p>
              </div>
            </div>
            <div className="aspect-square bg-stone-900 rotate-45 h-8 w-8 absolute top-[7.6rem] z-10 left-2"></div>
          </div>

          {/* Artem Jones */}
          <div className="rounded-xl p-3 h-fit bg-white outline-2 outline-stone-900 flex gap-3 flex-col">
            <p>
              Since starting my career in 2021, I have only followed one
              resource, roadmap.sh, it truly helped me go from 0 to having a job
              and changing the financial trajectory of my family.
            </p>
            <div className="flex flex-row gap-3">
              <div className="h-12 w-12 bg-stone-200 rounded-full flex items-center justify-center">
                Pic
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg">Artem Jones</h3>
                <p className="text-sm">Junior Frontend Developer</p>
              </div>
            </div>
          </div>
        </div>

        {/* Jackie Card */}
        <div className="flex flex-row gap-5 my-6">
          <div className="flex items-center justify-center bg-linear-to-bl from-sky-50 to-pink-50 w-60 rounded-xl">
            Pic
          </div>
          <div className="flex-1 bg-stone-900 text-white flex-col flex p-6 rounded-xl w-full">
            <div className="flex">⭐⭐⭐⭐⭐</div>
            <h3 className="text-xl mt-4">Jackie Mackle</h3>
            <p className="text-stone-400 mt-2">Engineering Manager</p>
            <p className="mt-4">
              I find myself recommending roadmap.sh to all the internees or
              junior developers. It`s a great way to skill up and grow in your
              career.
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-white outline-2 outline-stone-900 flex flex-col text-center items-center justify-center p-5">
          <p>
            roadmap.sh is an incredible resource. I was fortunate to discover it
            during my university days in 2018. Back then, it was just a single
            repository with three images. It`s amazing to see how much impact it
            has had on millions of lives since then.
          </p>
          <div className="flex mt-6 items-center gap-5">
            <p>⬅️</p>
            <div className="bg-stone-200 h-12 w-12 rounded-full flex items-center justify-center">
              Pic
            </div>
            <div className="bg-stone-300 h-16 w-16 rounded-full flex items-center justify-center">
              Pic
            </div>
            <div className="bg-stone-200 h-12 w-12 rounded-full items-center justify-center flex">
              Pic
            </div>
            <p>➡️</p>
          </div>
        </div>
      </div>
    </div>
  );
}
