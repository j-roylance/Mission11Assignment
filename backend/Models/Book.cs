// Model representing a bowler in the Bowling League database

namespace Mission10Assignment.Models;

public class Book
{
    public int BookID { get; set; }
    public string Title { get; set; } = "";
    public string? Author { get; set; }
    public string? Publisher { get; set; }
    public string? ISBN { get; set; }
    public string? Classification { get; set; }
    public string? Category { get; set; }
    public string? PageCount { get; set; }
    public string? Price { get; set; }     // Navigation property to the bowler's team
}