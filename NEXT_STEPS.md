# Tech Lead Plan: Content Generator Next Steps (V2)

This is an updated, accurate plan based on the backend code you provided.

---

### Phase 1: Update Backend Model and Create a `ContentController`

The goal is to align your `Content` model with the frontend's requirements and create the necessary endpoints to fetch and generate content.

**1.1. Update the `Content` Model**

Your existing `Content` model needs more fields.

**File: `ContentPlatform.API/Models/Content.cs`**
Modify the `Content` class to include `Title`, `Type`, and `Status`.

```csharp
// Add these new properties to your Content class
public class Content
{
    public Guid Id { get; set; }
    public Guid ProjectId { get; set; }
    
    // ADD THESE PROPERTIES
    public string Title { get; set; } = string.Empty; // e.g., "Marketing Blog Post"
    public string Type { get; set; } = string.Empty; // "text" or "image"
    public string Status { get; set; } = string.Empty; // "Completed", "InProgress", "Flagged"
    
    public string Data { get; set; } = string.Empty; // URL to S3 or the text itself
    public string UserId { get; set; } = string.Empty;
    public User User { get; set; } = default!;
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset UpdatedAt { get; set; }
    public DateTimeOffset? DeletedAt { get; set; }
}
```

**1.2. Create a New EF Core Migration**

After updating the model, create and apply a new migration to update your database schema. Run these commands in your backend project directory:

```bash
dotnet ef migrations add AddFieldsToContent
dotnet ef database update
```

**1.3. Create DTOs for Content**

Create a new file for Data Transfer Objects related to content.

**File: `ContentPlatform.API/Models/DTO/ContentDtos.cs` (New File)**
```csharp
namespace ContentPlatform.API.Models.DTO;

// For fetching recent content for the dashboard
public class RecentContentDto
{
    public string Id { get; set; }
    public string Title { get; set; }
    public string Type { get; set; }
    public string Date { get; set; } // e.g., "2 hours ago"
    public string Status { get; set; }
}

// For the content generation request
public class CreateContentRequestDto
{
    public string Prompt { get; set; }
    public string Type { get; set; } // "text" or "image"
    public Guid? ProjectId { get; set; } // Optional: associate with a project
}
```

**1.4. Create the `ContentController`**

This new controller will handle all content-related actions.

**File: `ContentPlatform.API/Controllers/ContentController.cs` (New File)**
```csharp
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using ContentPlatform.API.Models.DTO;
// Add other necessary using statements for your DbContext, etc.

[Authorize]
[ApiController]
[Route("api/content")]
public class ContentController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ContentController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("recent")]
    public async Task<ActionResult<IEnumerable<RecentContentDto>>> GetRecentContent()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userId)) return Unauthorized();

        var recentContent = await _context.Contents
            .Where(c => c.UserId == userId)
            .OrderByDescending(c => c.CreatedAt)
            .Take(10)
            .Select(c => new RecentContentDto
            {
                Id = c.Id.ToString(),
                Title = c.Title,
                Type = c.Type.ToLower(),
                Status = c.Status,
                // This is a simplification. A library like Humanizer can create "2 hours ago" strings.
                Date = c.CreatedAt.ToString("g") 
            })
            .ToListAsync();

        return Ok(recentContent);
    }
    
    // We will implement the POST method for generation in the next phase.
}
```

---

### Phase 2: Frontend Integration

Now, connect the dashboard to the new `GET /api/content/recent` endpoint.

**2.1. Update API Client (Frontend)**

Add a new function to `src/api/client.ts` to call the new endpoint.

**File: `src/api/client.ts`**
```typescript
// Add this interface to match the backend DTO
export interface RecentContentResponse {
  id: string;
  title: string;
  type: "text" | "image";
  date: string;
  status: "completed" | "in-progress" | "flagged";
}

// Add this function to the file
export const getRecentContent = async (token?: string | null): Promise<RecentContentResponse[]> => {
  if (!token) {
    throw new Error("Token not available");
  }
  const response = await fetchAuthenticated("/content/recent", token);
  return response.json();
};
```

**2.2. Fetch Real Data in Dashboard (Frontend)**

Modify `src/pages/dashboard/page.tsx` to use the new API call. **This is the change I attempted before, which you cancelled. You can now re-run it.** It will replace the mock data with a `useEffect` hook that fetches live data.

---

### Phase 3: Content Generation and Moderation

This is the core of the challenge. We'll implement the `POST /api/content` endpoint.

**3.1. Setup AWS SDK and Services (Backend)**

1.  **Install Packages**: Add `AWSSDK.Rekognition` and `AWSSDK.Comprehend` to your `.csproj`.
2.  **Configure Credentials**: Store your AWS credentials securely using `dotnet user-secrets set`.
3.  **Create Moderation Service**: Create a service class (`AwsModerationService.cs`) as detailed in the previous `NEXT_STEPS.md` to handle communication with AWS Rekognition and Comprehend.
4.  **Register Service**: Register it in `Program.cs`: `builder.Services.AddSingleton<AwsModerationService>();`

**3.2. Implement the Generation Endpoint**

Add the `POST` method to your `ContentController.cs`.

**File: `ContentPlatform.API/Controllers/ContentController.cs` (Add this method)**
```csharp
[HttpPost("generate")]
public async Task<IActionResult> GenerateContent([FromBody] CreateContentRequestDto request)
{
    var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
    if (string.IsNullOrEmpty(userId)) return Unauthorized();

    // --- THIS IS PSEUDO-CODE: Replace with your actual service calls ---
    
    // 1. Call your generative AI service (e.g., Azure OpenAI)
    // var generatedData = await _generativeAiService.Generate(request.Prompt, request.Type);
    var generatedData = $"Response to: {request.Prompt}"; // Placeholder

    // 2. Moderate the result (you will build this service)
    // bool isAcceptable = await _awsModerationService.IsContentAcceptable(generatedData, request.Type);
    bool isAcceptable = !generatedData.Contains("bad word"); // Placeholder

    // 3. Create and save the content object
    var newContent = new Content
    {
        Id = Guid.NewGuid(),
        UserId = userId,
        ProjectId = request.ProjectId ?? Guid.Empty, // Handle null ProjectId
        Title = request.Prompt.Substring(0, Math.Min(request.Prompt.Length, 50)), // Auto-generate title
        Type = request.Type,
        Status = isAcceptable ? "Completed" : "Flagged",
        Data = generatedData, // This could be text or a URL to an image in S3
        CreatedAt = DateTimeOffset.UtcNow,
        UpdatedAt = DateTimeOffset.UtcNow
    };

    _context.Contents.Add(newContent);
    await _context.SaveChangesAsync();

    // Map to DTO to return to frontend
    var dto = new RecentContentDto { /* ... map properties ... */ };
    return CreatedAtAction(nameof(GetRecentContent), new { id = newContent.Id }, dto);
}
```

This provides a clear and accurate path forward. Your immediate next step is to implement **Phase 1** in your backend. Once that is done, you can tell me to proceed with the frontend modifications.