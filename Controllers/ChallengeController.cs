using ChallengerApp.Models;
using ChallengerApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace ChallengerApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ChallengeController : ControllerBase
{
    private readonly IChallengeService _challengeService;

    public ChallengeController(IChallengeService challengeService)
    {
        _challengeService = challengeService;
    }

    [HttpGet]
    public IActionResult GetAllChallenges()
    {
        return Ok(_challengeService.GetAllChallenges());
    }

    [HttpGet("{id}")]
    public IActionResult GetChallenge(string id)
    {
        var challenge = _challengeService.GetChallenge(id);
        if (challenge == null)
        {
            return NotFound();
        }
        return Ok(challenge);
    }

    [HttpPost]
    public IActionResult CreateChallenge(Challenge challenge)
    {
        var createdChallenge = _challengeService.CreateChallenge(challenge);
        return CreatedAtAction(nameof(GetChallenge), new { id = createdChallenge.Id }, createdChallenge);
    }

    [HttpPost("progress")]
    public IActionResult UpdateProgress(DailyProgress progress)
    {
        _challengeService.UpdateProgress(progress);
        return Ok();
    }

    [HttpGet("{id}/leaderboard")]
    public IActionResult GetLeaderboard(string id)
    {
        return Ok(_challengeService.GetLeaderboard(id));
    }
}