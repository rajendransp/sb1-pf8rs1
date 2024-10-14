using ChallengerApp.Models;

namespace ChallengerApp.Services;

public class ChallengeService : IChallengeService
{
    private readonly List<Challenge> _challenges = new();
    private readonly List<DailyProgress> _progress = new();

    public IEnumerable<Challenge> GetAllChallenges() => _challenges;

    public Challenge? GetChallenge(string id) => _challenges.FirstOrDefault(c => c.Id == id);

    public Challenge CreateChallenge(Challenge challenge)
    {
        _challenges.Add(challenge);
        return challenge;
    }

    public void UpdateProgress(DailyProgress progress)
    {
        _progress.Add(progress);
    }

    public IEnumerable<LeaderboardEntry> GetLeaderboard(string challengeId)
    {
        var challengeProgress = _progress.Where(p => p.ChallengeId == challengeId);
        return challengeProgress
            .GroupBy(p => p.UserId)
            .Select(g => new LeaderboardEntry
            {
                UserId = g.Key,
                CompletedTasksCount = g.SelectMany(p => p.CompletedTasks).Distinct().Count()
            })
            .OrderByDescending(e => e.CompletedTasksCount);
    }
}