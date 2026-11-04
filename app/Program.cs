using Spectre.Console;

var students = new List<Student>
{
  new Student(Name: "Cody Collier",Age:55),
  new Student(Name: "Ola Conner",Age:50),
  new Student(Name: "Lettie Briggs",Age:54),
  new Student(Name: "Vernon Rodgers",Age:37),
  new Student(Name: "Brent Mitchell",Age:45),
};
var sortedStudents = students.OrderByDescending(n => n.Age).ToArray();
var studentsTable = new Table();
studentsTable.AddColumn("Name");
studentsTable.AddColumn("Age");
foreach (var student in students)
{
  studentsTable.AddRow(student.Name, student.Age.ToString());
}
Console.WriteLine("Ordered students:");
AnsiConsole.Write(studentsTable);