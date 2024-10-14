using ChallengerApp.Models;

namespace ChallengerApp.Services;

public interface IChallengeService
{
    IEnumerable<Challenge> GetAllChallenges();
    Challenge? GetChallenge(string id);
    Challenge CreateChallenge(Challenge challenge);
    void UpdateProgress(DailyProgress progress);
    IEnumerable<LeaderboardEntry> GetLeaderboard(string challengeId);
}