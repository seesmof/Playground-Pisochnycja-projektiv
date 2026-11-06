Console.Write("Please enter a number: ");
var input = Console.ReadLine();

bool success = long.TryParse(input, out long data);

if (success)
{
  Console.WriteLine($"The given number is {data}.");
  return;
}

while (!success)
{
  Console.Write("The number is not a real number. Please try again: ");
  input = Console.ReadLine();

  success = long.TryParse(input, out long number);

  if (success)
  {
    Console.WriteLine($"The given number is: {number}.");
    return;
  }
}