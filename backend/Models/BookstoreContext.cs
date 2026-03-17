// Entity Framework DbContext - connects to the Bowling League SQLite database

using Microsoft.EntityFrameworkCore;
using Mission10Assignment.Models;

namespace Mission10Assignment.Data;

public class BookstoreContext : DbContext
{
    public BookstoreContext(DbContextOptions<BookstoreContext> options)
        : base(options) { }

    // DbSets represent the tables we can query
    public DbSet<Book> Books { get; set; }
}