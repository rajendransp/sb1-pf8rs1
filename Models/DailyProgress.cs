namespace ChallengerApp.Models;

public class DailyProgress
{
    public string UserId { get; set; } = string.Empty;
    public string ChallengeId { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public List<string> CompletedTasks { get; set; } = new List<string>();
}