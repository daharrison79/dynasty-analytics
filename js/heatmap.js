function classifyShotZone(shot) {
    const x = shot.CourtX;
    const y = shot.CourtY;
    // Paint
    if (
        x >= 19 &&
        x <= 31 &&
        y <= 14
    ) {
        return "Paint";
    }
    // Left Midrange
    if (
        x < 19 &&
        y <= 26
    ) {
        return "Left Midrange";
    }
    // Right Midrange
    if (
        x > 31 &&
        y <= 26
    ) {
        return "Right Midrange";
    }
    // High Post
    if (
        x >= 18 &&
        x <= 32 &&
        y > 14 &&
        y <= 26
    ) {
        return "High Post";
    }
    // Left 3
    if (
        x < 18 &&
        y > 26
    ) {
        return "Left 3";
    }
    // Right 3
    if (
        x > 32 &&
        y > 26
    ) {
        return "Right 3";
    }
    // Center 3
    return "Center 3";
}

function buildZoneStats(shots) {
    const zones = {};
    shots.forEach(shot => {
        const zone =
            classifyShotZone(shot);
        if (!zones[zone]) {
            zones[zone] = {
                makes: 0,
                attempts: 0
            };
        }
        zones[zone].attempts++;
        if (shot.Made === 1) {
            zones[zone].makes++;
        }
    });
    return zones;
}

function getZonePct(zones, zoneName) {
    if (!zones[zoneName]) {
        return "0%";
    }
    const stats =
        zones[zoneName];
    const pct =
        stats.attempts === 0
        ? 0
        : (
            stats.makes /
            stats.attempts *
            100
        ).toFixed(1);
    return `${pct}%`;
}

function getZoneText(zones, zoneName) {
    if (!zones[zoneName]) {
        return "0/0";
    }
    const stats =
        zones[zoneName];
    return `${stats.makes}/${stats.attempts}`;
}

function getZoneColor(pct) {
    const value =
        parseFloat(
            pct.replace("%", "")
        );
    if (value >= 70) {
        return "0,100,0";
    }
    if (value >= 60) {
        return "50,180,0";
    }
    if (value >= 50) {
        return "150,220,0";
    }
    if (value >= 40) {
        return "255,220,0";
    }
    if (value >= 30) {
        return "255,140,0";
    }
    if (value >= 20) {
        return "220,80,0";
    }
    return "180,0,0";
}

function getZoneOpacity(attempts) {
    if (attempts >= 20) {
        return 0.70;
    }
    if (attempts >= 10) {
        return 0.55;
    }
    if (attempts >= 5) {
        return 0.40;
    }
    return 0.20;
}

function renderZoneHeatMap(shots,overlayId) {
    const zones =
        buildZoneStats(shots);
    console.log(zones);
    const paintPct =
        getZonePct(
            zones,
            "Paint"
        );
    const paintAttempts =
        zones["Paint"]
            ? zones["Paint"].attempts
            : 0;
    const paintColor =
        getZoneColor(
            paintPct
        );
    const paintFill =
        `rgba(
            ${paintColor},
            ${getZoneOpacity(
                paintAttempts
            )}
        )`;
    const paintText =
        getZoneText(
            zones,
            "Paint"
        );
    const leftMidPct =
        getZonePct(
            zones,
            "Left Midrange"
        );
    const leftMidAttempts =
        zones["Left Midrange"]
            ? zones["Left Midrange"].attempts
            : 0;
    const leftMidColor =
        getZoneColor(
            leftMidPct
        );
    const leftMidFill =
        `rgba(
            ${leftMidColor},
            ${getZoneOpacity(
                leftMidAttempts
            )}
        )`;
    const leftMidText =
        getZoneText(
            zones,
            "Left Midrange"
        );
    const rightMidPct =
        getZonePct(
            zones,
            "Right Midrange"
        );
    const rightMidAttempts =
        zones["Right Midrange"]
            ? zones["Right Midrange"].attempts
            : 0;
    const rightMidColor =
        getZoneColor(
            rightMidPct
        );
    const rightMidFill =
        `rgba(
            ${rightMidColor},
            ${getZoneOpacity(
                rightMidAttempts
            )}
        )`;
    const rightMidText =
        getZoneText(
            zones,
            "Right Midrange"
        );
    const highPostPct =
        getZonePct(
            zones,
            "High Post"
        );
    const highPostAttempts =
        zones["High Post"]
            ? zones["High Post"].attempts
            : 0;
    const highPostColor =
        getZoneColor(
            highPostPct
        );
    const highPostFill =
        `rgba(
            ${highPostColor},
            ${getZoneOpacity(
                highPostAttempts
            )}
        )`;
    const highPostText =
        getZoneText(
            zones,
            "High Post"
        );
    const left3Pct =
        getZonePct(
            zones,
            "Left 3"
        );
    const left3Attempts =
        zones["Left 3"]
            ? zones["Left 3"].attempts
            : 0;
        const left3Color =
        getZoneColor(
            left3Pct
        );
    const left3Fill =
        `rgba(
            ${left3Color},
            ${getZoneOpacity(
                left3Attempts
            )}
        )`;
    const left3Text =
        getZoneText(
            zones,
            "Left 3"
        );
    const center3Pct =
        getZonePct(
            zones,
            "Center 3"
        );
    const center3Attempts =
        zones["Center 3"]
            ? zones["Center 3"].attempts
            : 0;
    const center3Color =
        getZoneColor(
            center3Pct
        );
    const center3Fill =
        `rgba(
            ${center3Color},
            ${getZoneOpacity(
                center3Attempts
            )}
        )`;
    const center3Text =
        getZoneText(
            zones,
            "Center 3"
        );
    const right3Pct =
        getZonePct(
            zones,
            "Right 3"
        );
    const right3Attempts =
        zones["Right 3"]
            ? zones["Right 3"].attempts
            : 0;
    const right3Color =
        getZoneColor(
            right3Pct
        );
    const right3Fill =
        `rgba(
            ${right3Color},
            ${getZoneOpacity(
                right3Attempts
            )}
        )`;
    const right3Text =
        getZoneText(
            zones,
            "Right 3"
        );

    let html = `
        <svg
            viewBox="0 0 100 100"
            style="
                width:100%;
                height:100%;
            ">

            <rect
                x="33"
                y="10"
                width="34"
                height="40"
                fill="${paintFill}"
                stroke="white"
                stroke-width="0.5"
            />
            <text
                x="50"
                y="26"
                text-anchor="middle"
                font-size="2.5">
                ${paintText}
            </text>
            <text
                x="50"
                y="30"
                text-anchor="middle"
                font-size="5">
                ${paintPct}
            </text>
            <path
                d="
                    M 32 10
                    L -8 10
                    L -8 20
                    Q -8 35 0 50
                    Q 10 64 13 66
                    L 32 50
                    Z
                "
                fill="${leftMidFill}"
                stroke="white"
                stroke-width="0.5"
            />
            <text
                x="16"
                y="35"
                text-anchor="middle"
                font-size="2.5">
                ${leftMidText}
            </text>
            <text
                x="16"
                y="40"
                text-anchor="middle"
                font-size="5">
                ${leftMidPct}
            </text>
            <path
                d="
                    M 68 10
                    L 108 10
                    L 108 20
                    Q 108 35 100 50
                    Q 90 64 87 66
                    L 68 50
                    Z
                "
                fill="${rightMidFill}"
                stroke="white"
                stroke-width="0.5"
            />
            <text
                x="84"
                y="35"
                text-anchor="middle"
                font-size="2.5">
                ${rightMidText}
            </text>
            <text
                x="84"
                y="40"
                text-anchor="middle"
                font-size="5">
                ${rightMidPct}
            </text>
            <path
                d="
                    M 32 50
                    L 13 66
                    Q 31 81 50 81
                    Q 69 81 87 66
                    L 68 50
                    Z
                "
                fill="${highPostFill}"
                stroke="white"
                stroke-width="0.5"
            />
            <text
                x="50"
                y="63"
                text-anchor="middle"
                font-size="2.5">
                ${highPostText}
            </text>
            <text
                x="50"
                y="68"
                text-anchor="middle"
                font-size="5">
                ${highPostPct}
            </text>
            <path
                d="
                    M -9 10
                    L -24 10
                    L -24 100
                    L 13 66
                    Q 10 64 0 50
                    Q -8 35 -8 20 
                    Z
                "
                fill="${left3Fill}"
                stroke="white"
                stroke-width="0.5"
            />
            <text
                x="0"
                y="62"
                text-anchor="middle"
                font-size="2.5">
                ${left3Text}
            </text>
            <text
                x="0"
                y="67"
                text-anchor="middle"
                font-size="5">
                ${left3Pct}
            </text>
            <path
                d="
                    M 109 10
                    L 124 10
                    L 124 100
                    L 87 66
                    Q 90 64 100 50
                    Q 108 35 108 20 
                    Z
                "
                fill="${right3Fill}"
                stroke="white"
                stroke-width="0.5"
            />
            <text
                x="100"
                y="62"
                text-anchor="middle"
                font-size="2.5">
                ${right3Text}
            </text>
            <text
                x="100"
                y="67"
                text-anchor="middle"
                font-size="5">
                ${right3Pct}
            </text>
            <path
                d="
                    M 13 67
                    L -23 100
                    L 123 100
                    L 87 67
                    Q 69 82 50 82
                    Q 31 82 13 67
                    Z
                "
                fill="${center3Fill}"
                stroke="white"
                stroke-width="0.5"
            />
            <text
                x="50"
                y="92"
                text-anchor="middle"
                font-size="2.5">
                ${center3Text}
            </text>
            <text
                x="50"
                y="97"
                text-anchor="middle"
                font-size="5">
                ${center3Pct}
            </text>
        </svg>
    `;
    const overlay =
        document.getElementById(
            overlayId
        );
    console.log("Overlay ID:", overlayId);
    console.log("Overlay Element:", overlay);
    if (overlay) {
        overlay.innerHTML = html;
    }

}