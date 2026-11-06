Console.Write("Please add a number: ");
var input = Console.ReadLine();

bool success = int.TryParse(input, out var result);

if (success)
{
  Console.WriteLine($"The input parsed is: {result}");
}
else
{
  Console.WriteLine($"The parsing failed...");
}