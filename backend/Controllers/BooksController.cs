// API controller that serves bowler data from the database

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Mission10Assignment.Data;
using Mission10Assignment.Models;

namespace Mission10Assignment.Controllers;

[ApiController]
[Route("api/[controller]")]  // Base route: /api/Bowling
public class BooksController : ControllerBase
{
    private readonly BookstoreContext _context;

    // Inject the database context via dependency injection
    public BooksController(BookstoreContext context)
    {
        _context = context;
    }

    /// <summary>
    /// GET /api/Bowling - Returns all bowlers on the Marlins or Sharks teams
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<object>>> GetBooks()
    {
        var books = await _context.Books
        .Select(b => new  // Project to anonymous object for JSON response
            {
                b.BookID,
                b.Title,
                b.Author,
                b.Publisher,
                b.ISBN,
                b.Classification,
                b.Category,
                b.PageCount,
                b.Price
            })
            .ToListAsync();

        return Ok(books);
    }
}