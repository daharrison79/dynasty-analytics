const params =
    new URLSearchParams(
        window.location.search
    );

const CURRENT_SEASON =
    params.get("season")
    || "2026";

const CURRENT_TEAM =
    params.get("team")
    || "13-14";

function dataPath(fileName) {
    return `data/${CURRENT_SEASON}/${CURRENT_TEAM}/${fileName}`;
}
``