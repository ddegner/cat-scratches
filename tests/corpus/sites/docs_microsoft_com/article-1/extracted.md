Edit

# General structure of a C# program

Tip

**New to developing software?** Start with the Get started tutorials first. They walk you through writing your first C# programs before you learn about program structure.

**Experienced in another language?** You might want to skim the Get started section for C#-specific syntax, then come back here.

You build C# programs from these core building blocks: namespaces organize your types, types (classes, structs, interfaces, enums, and delegates) define behavior and data, and statements and expressions perform work at run time. The way you structure the entry point depends on which application style you choose.

## Choosing your application style

When you create a C# program, make two independent choices about how to structure it:

* **File-based or project-based?**
 * A file-based app runs from a single `.cs` file with no project file.
 * A project-based app uses a `.csproj` file and can span multiple source files.
* **Top-level statements or `Main` method?**
 * Top-level statements let you write executable code directly at the top of a file.
 * A `Main` method wraps the entry point in an explicit static method.

Both project-based apps and file-based apps support either entry-point style.

### File-based apps vs. project-based apps

Starting with C# 14 and .NET 10, _file-based apps_ let you run a program contained in a single `*.cs` file without a project file. Store the following code in a file named `hello-world.cs` and run it with `dotnet run hello-world.cs` or `dotnet hello-world.cs`:

```
#!/usr/bin/env dotnet
Console.WriteLine("Hello, World!");
```

Note

The `#!` line enables Unix operating systems to execute the file directly (for example, `./hello-world.cs`). This requires the _execute_ permission to be set (`chmod +x <file>`).

File-based apps support all C# syntax and can use preprocessor directives to configure the build system. Use file-based apps for small command-line utilities, prototypes, and experiments. A file-based app consists of a single file in a directory:

```
my-app/
└── hello-world.cs
```

_Project-based apps_ use a `.csproj` file and the .NET CLI commands `dotnet new`, `dotnet build`, and `dotnet run` workflow. Choose project-based apps when your program spans multiple files or needs fine-grained build configuration. A project-based app includes a project file alongside one or more source files:

```
my-app/
├── my-app.csproj
├── Program.cs
├── Models/
│ └── Person.cs
└── Services/
 └── GreetingService.cs
```

If your file-based app grows, you can easily convert it to a project-based app. Run `dotnet project convert` to generate a project file from your existing source file.

If you know your app needs multiple source files from the start, begin with a project-based app. You avoid the conversion step and can organize your code into separate files right away.

### Top-level statements vs. `Main` method

By using top-level statements, you can write executable code directly in one file without wrapping it in a class and `Main` method. This style is the default when you create a new console app with `dotnet new console`. The following example shows a modern C# program that uses top-level statements:

```
Console.WriteLine("Hello, World!");

namespace YourNamespace
{
 class YourClass
 {
 }

 struct YourStruct
 {
 }

 interface IYourInterface
 {
 }

 delegate int YourDelegate();

 enum YourEnum
 {
 }
}
```

Only one file in a project can have top-level statements, and the entry point is the first line of program text in that file. As you build larger programs, you include more program elements.

You can also define an explicit static `Main` method as the program's entry point:

```
// A skeleton of a C# program using an explicit Main method
namespace YourNamespace;

class Program
{
 static void Main(string[] args)
 {
 Console.WriteLine("Hello, World!");
 }
}
```

Both entry-point styles work with file-based and project-based apps. Both styles support the same features.

## Building and running C# programs

C# is a _compiled_ language. For project-based apps, use the `dotnet build` command to compile source files into a binary package. Use `dotnet run` to build and run in one step. The `dotnet` CLI, included in the .NET SDK, provides many tools to create, build, and manage C# projects.

For file-based apps, `dotnet run hello-world.cs` compiles and runs the single file directly - no project file required.

## Expressions and statements

If you followed the Get started tutorials, you already wrote expressions and statements. Every line of code you typed was one or the other (or both). Now let's define those terms.

Expressions and statements are the fundamental building blocks of a C# program. An _expression_ produces a value. A _statement_ performs an action and typically ends in a semicolon.

The following are expressions:

* `42` (literal value)
* `x + y` (arithmetic operation)
* `Math.Max(a, b)` (method call that produces a value)
* `condition ? trueValue : falseValue` (conditional expression)
* `new Person("John")` (object creation)

A _statement_ performs an action. Statements control program flow, declare variables, or invoke operations. The following are statements:

* `int x;` (declaration statement)
* `int x = 42;` (declaration statement with initialization)
* `Console.WriteLine("Hello");` (method call statement)
* `if (condition) { /* code */ }` (conditional statement)
* `return result;` (return statement)

Statements often contain expressions, and expressions can nest inside other expressions. For example, the following declaration statement assigns `f` to the result of an addition expression. That addition expression adds the results of two method call expressions:

```
var maxResult = Math.Max(a, b) + Math.Max(c, d);
```

For detailed information about statements, see Statements. For information about expression-bodied members, see Expression-bodied members.

* Classes
* Structs
* Namespaces
* Interfaces
* Enums
* Delegates
* Basic concepts in the C# language specification

Was this page helpful?

No

* Last updated on 2026-03-20
