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

var students = new[]
{
  new { Name = "Theodore Collier", Age = 60},
  new { Name = "Ruth Dennis", Age = 60},
  new { Name = "Elmer Carpenter", Age = 50},
  new { Name = "Jeremiah Warner", Age = 35},
  new { Name = "Alex Parks", Age = 45},
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