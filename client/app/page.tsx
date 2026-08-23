export type Data = {
  name: string;
  email: string;
  age: number;
  salary: number;
};

const initialData: Data[] = [
  { name: "Aaron Townsend", email: "zufe@kohbe.tn", age: 36, salary: 1808 },
  { name: "Cecilia Fields", email: "za@ite.gq", age: 31, salary: 2894 },
  { name: "Nancy Bishop", email: "ohefo@biwniecu.tc", age: 54, salary: 2963 },
  { name: "Lucille Lawrence", email: "zi@hi.wf", age: 55, salary: 1649 },
  { name: "Maud Sutton", email: "wa@zuf.pe", age: 60, salary: 1629 },
  { name: "Clayton Moore", email: "udzo@ven.bw", age: 47, salary: 2858 },
  { name: "Allie Norton", email: "ew@oto.ht", age: 55, salary: 2013 },
];

export default function Page() {
  return (
    <div className="bg-sky-50 min-h-screen">
      <div className="container mx-auto px-4 py-2">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
}
