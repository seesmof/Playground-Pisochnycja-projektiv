const badges = [
  "React",
  "Grace",
  "Mercy",
  "Peace",
  "Joy",
  "Holy Spirit",
  "Fruits of the Spirit",
  "Redemption",
  "Jesus Christ",
  "The Lord",
  "Yahweh",
  "God",
  "Bible",
  "Spirituality",
];

export default function Page() {
  return (
    <div className="min-h-screen bg-green-50">
      <div className="mx-auto max-w-3xl flex p-3">
        <div className="bg-white rounded-md p-3">
          <h1 className="font-bold text-lg">A wrappable row of badges</h1>
          <p>This is a simple app having a wrappable row of badges.</p>

          <article className="flex flex-wrap mt-3 gap-1">
            {badges.map((badge, index) => (
              <span
                className="bg-green-700 text-green-50 px-2  rounded-full"
                key={index}
              >
                {badge}
              </span>
            ))}
          </article>
        </div>
      </div>
    </div>
  );
}
