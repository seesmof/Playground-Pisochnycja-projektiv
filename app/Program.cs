using Spectre.Console;

int[] data = { 20, 90, 67, 3, 16, 23, 2 };
Console.WriteLine($"Original: {string.Join(", ", data)}");
double mean = data.Average();
Console.WriteLine($"Array mean: {mean}");
Console.WriteLine($"Array length: {data.Length}");

var moreThanMean = data.Where(number => number >= mean);
Console.WriteLine($"More than mean: {string.Join(", ", moreThanMean)}");

var doubledArray = data.Select(n => n * 2);
Console.WriteLine($"Doubled: {string.Join(", ", doubledArray)}");

var students = new List<Student>
{
  new Student { Name="Ella Haynes", Age=31,Email="oz@ed.ro"},
  new Student { Name="Marian Saunders", Age=59,Email="nilha@uzauho.sb"},
  new Student { Name="Francis Flowers", Age=42,Email="fozse@siskoate.co.uk"},
  new Student { Name="Harriett Mendez", Age=59,Email="mono@tuk.mk"},
  new Student { Name="Lucille Gill", Age=58,Email="aj@ecac.kw"},
};

var sortedStudents = students.OrderByDescending(n => n.Age).ToArray();
Console.WriteLine("Ordered students:");
var sortedStudentsTable = new Table();
sortedStudentsTable.AddColumn("Name");
sortedStudentsTable.AddColumn("Age");
foreach (var student in students)
{
  sortedStudentsTable.AddRow(student.Name, student.Age.ToString());
}
AnsiConsole.Write(sortedStudentsTable);