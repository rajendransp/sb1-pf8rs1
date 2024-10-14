namespace ChallengerApp.Models;

public class Challenge
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Title { get; set; } = string.Empty;
    public List<Task> Tasks { get; set; } = new List<Task>();
    public Duration Duration { get; set; } = new Duration();
    public DateTime StartDate { get; set; } = DateTime.Now;
    public List<string> Participants { get; set; } = new List<string>();
}

public class Task
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Description { get; set; } = string.Empty;
    public bool Completed { get; set; }
}

public class Duration
{
    public DurationType Type { get; set; }
    public int Value { get; set; }
}

public enum DurationType
{
    Week,
    Month,
    Days
}