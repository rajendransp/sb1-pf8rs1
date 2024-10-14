namespace ChallengerApp.Models;

public class LeaderboardEntry
{
    public string UserId { get; set; } = string.Empty;
    public int CompletedTasksCount { get; set; }
}