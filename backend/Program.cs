// ASP.NET Core backend - configures services, middleware, and API routes

using Microsoft.EntityFrameworkCore;
using Mission10Assignment.Data;

// Create the web application builder
var builder = WebApplication.CreateBuilder(args);

// Register MVC controllers and views
builder.Services.AddControllersWithViews();

// Configure CORS to allow the React frontend (running on port 5173) to call this API
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:5173")
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

// Register the database context with SQLite using the connection string from appsettings.json
builder.Services.AddDbContext<BookstoreContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// In production, use exception handler and HSTS for security
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

// Middleware pipeline
app.UseHttpsRedirection();
app.UseRouting();
app.UseCors();        // Enable CORS for cross-origin API requests from React
app.UseAuthorization();

// Map static files, API controllers, and MVC routes
app.MapStaticAssets();
app.MapControllers(); // Maps [ApiController] routes (e.g. /api/Bowling)
app.MapControllerRoute(
        name: "default",
        pattern: "{controller=Home}/{action=Index}/{id?}")
    .WithStaticAssets();

app.Run();