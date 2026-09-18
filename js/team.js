async function loadTeamDashboard() {
    const shotResponse =
        await fetch(dataPath("shots.json"));
    const shots =
        await shotResponse.json();
    const totalAttempts =
        shots.length;
    const totalMakes =
        shots.filter(
            shot => shot.Made === 1
        ).length;
   
    window.teamShots = shots;
    const response =
        await fetch(dataPath("team.json"));
    const games =
        await response.json();
    const container =
        document.getElementById(
            "team-dashboard"
        );
    if (games.length === 0) {
        container.innerHTML =
            "<p>No games available.</p>";
        return;
    }

    const gamesPlayed = games.length;

    let totalPoints = 0;
    let totalPointsAgainst = 0;
    let totalOppFGM = 0;
    let totalOppFGA = 0;
    let totalRebounds = 0;
    let totalAssists = 0;
    let totalSteals = 0;
    let totalTurnovers = 0;
    let total3PM = 0;
    let total3PA = 0;
    let totalOppRebounds = 0;
    let totalOppTO = 0;
    let totalFouls = 0;
    let totalOppFouls = 0;

    let wins = 0;
    let losses = 0;

    games.forEach(game => {
        totalPoints += game.TeamPTS;
        totalPointsAgainst += game.OppPTS;
        totalOppFGM += game.OppFGM;
        totalOppFGA += game.OppFGA;
        totalRebounds += game.TeamREB;
        totalOppRebounds += game.OppREB;
        totalAssists += game.TeamAST;
        totalSteals += game.TeamSTL;
        total3PM += game.Team3PM;
        total3PA += game.Team3PA;
        totalTurnovers += game.TeamTO;
        totalOppTO += game.OppTO;
        totalFouls += game.TeamFOUL;
        totalOppFouls += game.OppFOUL
        if (game.Result === "W") {
            wins++;
        } else {
            losses++;
        }
        console.log(game);
    });

    const fgPct =
        totalAttempts === 0
            ? 0
            : (
                (totalMakes/totalAttempts)*100
            ).toFixed(1)
    const oppFgPct =
        totalOppFGA === 0
            ? 0
            : (
                (totalOppFGM/totalOppFGA) *100
            ).toFixed(1) 
    const threePct =
            total3PA === 0
            ? 0
            : (
                (total3PM/total3PA)*100
            ).toFixed(1);
    const ppg =
        (totalPoints / gamesPlayed).toFixed(1);
    const papg =
        (totalPointsAgainst / gamesPlayed).toFixed(1);
    const rpg =
        (totalRebounds / gamesPlayed).toFixed(1);
    const oppRPG =
        (totalOppRebounds / gamesPlayed).toFixed(1)
    const apg =
        (totalAssists / gamesPlayed).toFixed(1);
    const spg =
        (totalSteals / gamesPlayed).toFixed(1);
    const topg =
        (totalTurnovers / gamesPlayed).toFixed(1);
    const oppTO =
        (totalOppTO /gamesPlayed).toFixed(1);
    const fpg =
        (totalFouls/gamesPlayed).toFixed(1);
    const oppFpg =
        (totalOppFouls/gamesPlayed).toFixed(1);

    console.log("PAPG:", papg);
    console.log("SPG:", spg);
    console.log("Total PA:", totalPointsAgainst);
    console.log("Total STL:", totalSteals);
    
    let gameLogHtml = "";
    games.forEach(game => {
        gameLogHtml += `
            <div
                class="game-log-entry"
                onclick="filterTeamGame('${game.GameFolder}')">
                <strong>${game.Date}</strong>
                <span>
                ${game.Opponent}
                </span>
                <span>
                <strong>${game.Result}</strong>
                </span>
                <span>
                    PF: ${game.TeamPTS}
                </span>
                <span>
                    PA: ${game.OppPTS}
                </span>
            </div>
        `;
    });

    container.innerHTML = `

        <div class="stat-section">
            <h3>Record</h3>
            <div class="team-stat-grid">
                <div class="team-stat-card">
                    <div class="team-stat-label">Wins</div>
                    <div class="team-stat-value">${wins}</div>
                </div>
                <div class="team-stat-card">
                    <div class="team-stat-label">Losses</div>
                    <div class="team-stat-value">${losses}</div>
                </div>   
        </div>
        <div class="stat-section">
            <h3>Season Averages</h3>
            <div class="team-stat-grid">
            
            <div class="team-stat-card">
                <div class="team-stat-label">Points/Gm</div>
                <div class="team-stat-value">${ppg}</div>
            </div>
            <div class="team-stat-card">
                <div class="team-stat-label">Points Against/Gm</div>
                <div class="team-stat-value">${papg}</div>
            </div>

            <div class="team-stat-card">
                <div class="team-stat-label">FG%</div>
                <div class="team-stat-value">${fgPct}%</div>
            </div>                
            <div class="team-stat-card">
                <div class="team-stat-label">Opponent FG%</div>
                <div class="team-stat-value">${oppFgPct}%</div>
            </div>

            <div class="team-stat-card">
                <div class="team-stat-label">Rebounds/Gm</div>
                <div class="team-stat-value">${rpg}</div>
            </div>
            <div class="team-stat-card">
                <div class="team-stat-label">Opp. Rebounds/Gm</div>
                <div class="team-stat-value">${oppRPG}</div>
            </div>

            <div class="team-stat-card">
                <div class="team-stat-label">Turnovers/Gm</div>
                <div class="team-stat-value">${topg}</div>
            </div>
            <div class="team-stat-card">
                <div class="team-stat-label">Opp Turnovers/Gm</div>
                <div class="team-stat-value">${oppTO}</div>
            </div>
            <div class="team-stat-card">
                <div class="team-stat-label">Fouls/Gm</div>
                <div class="team-stat-value">${fpg}</div>
            </div>
            <div class="team-stat-card">
                <div class="team-stat-label">Opp Fouls/Gm</div>
                <div class="team-stat-value">${oppFpg}</div>
            </div>


            <div class="team-stat-card">
                <div class="team-stat-label">3PT%</div>
                <div class="team-stat-value">${threePct}%</div>
            </div>
            <div class="team-stat-card">
                <div class="team-stat-label">Assits/Gm</div>
                <div class="team-stat-value">${apg}</div>
            </div>
            <div class="team-stat-card">
                <div class="team-stat-label">Steals/Gm</div>
                <div class="team-stat-value">${spg}</div>
            </div>
        </div>
    </div>
    <div class="stat-section">
        <h3>Season Totals</h3>
        <div class="team-stat-grid">
            <div class="team-stat-card">
                <div class="team-stat-label">PTS</div>
                <div class="team-stat-value">${totalPoints}</div>
            </div>
            <div class="team-stat-card">
                <div class="team-stat-label">PA</div>
                <div class="team-stat-value">${totalPointsAgainst}</div>
            </div>
            <div class="team-stat-card">
                <div class="team-stat-label">REB</div>
                <div class="team-stat-value">${totalRebounds}</div>
            </div>
            <div class="team-stat-card">
                <div class="team-stat-label">AST</div>
                <div class="team-stat-value">${totalAssists}</div>
            </div>
            <div class="team-stat-card">
                <div class="team-stat-label">STL</div>
                <div class="team-stat-value">${totalSteals}</div>
            </div>
            <div class="team-stat-card">
                <div class="team-stat-label">TO</div>
                <div class="team-stat-value">${totalTurnovers}</div>
            </div>
        </div>
        <div class="stat-section">
            <h3>Game Log</h3>
            <button onclick="showAllTeamShots()">
                All Games
            </button>   
            <div class="game-log-container">
                ${gameLogHtml}
            </div>
        </div>
    </div>
    `;

    const shotContainer = 
        document.getElementById(
            "team-shot-chart"
        );
    if (shotContainer) {
        renderTeamShots(
            window.teamShots,
           shotContainer
        );
        updateTeamShotSummary(
            window.teamShots
        );
        renderZoneHeatMap(
            window.teamShots,
            "team-zone-overlay"
        );
    }
}

loadTeamDashboard();

function renderTeamShots(shots,shotContainer)
{
    shotContainer.innerHTML = `
        <img src="images/court.png" alt=court>
    `;
    shots.forEach(shot => {
        const marker =
            document.createElement("div");
        marker.classList.add(
            "shot-marker"
        );
        if (shot.Made === 1) {
            marker.classList.add(
                "shot-made"
            );
        } else {
            marker.classList.add(
                "shot-missed"
            );
        }
        const left =
            (shot.CourtX / 50) * 100;

        const top =
            5 +
            ((shot.CourtY / 41) * 90);
        marker.style.left =
            `${left}%`;
        marker.style.top =
            `${top}%`;
        marker.title =
            `${shot.Made ? "Made" : "Missed"} ${shot.ShotType}`;
        shotContainer.appendChild(
            marker
        );
    });
}

function updateTeamShotSummary(shots)
{
    const summary =
        document.getElementById(
            "team-shot-summary"
        );
    if (!summary) {
        return;
    }
    const attempts =
        shots.length;
    const makes =
        shots.filter(
            shot => shot.Made === 1
        ).length;
    const fgPct =
        attempts === 0
            ? 0
            : (
                (makes / attempts)
                * 100
            ).toFixed(1);
    summary.innerHTML = `
        <p>
            Attempts:
            ${attempts}
        </p>
        <p>
            Makes:
            ${makes}
        </p>
        <p>
            FG%:
            ${fgPct}%
        </p>
    `;
}

function showAllTeamShots() {
    const shotContainer =
        document.getElementById(
            "team-shot-chart"
        );
    if (!shotContainer) {
        return;
    }
    const label =
        document.getElementById(
            "team-shot-filter"
        );
    if (label) {
        label.textContent =
            "Showing: All Games";
    }
    renderTeamShots(
        window.teamShots,
        shotContainer
    );
    updateTeamShotSummary(
        window.teamShots
    );
    renderZoneHeatMap(
        window.teamShots,
        "team-zone-overlay"
    );
}

function filterTeamGame(gameFolder) {
    const shotContainer =
        document.getElementById(
            "team-shot-chart"
        );
    if (!shotContainer) {
        return;
    }
    const filteredShots =
        window.teamShots.filter(
            shot =>
                shot.GameFolder === gameFolder
        );
    const label =
        document.getElementById(
            "team-shot-filter"
        );
    if (label) {
        label.textContent =
            `Showing: ${gameFolder}`;
    }
    renderTeamShots(
        filteredShots,
        shotContainer
    );
    updateTeamShotSummary(
        filteredShots
    );
    renderZoneHeatMap(
        filteredShots,
        "team-zone-overlay"
    );
}