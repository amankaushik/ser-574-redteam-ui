function getBaseline(key, baselines) {
    if (baselines[key] == null)
        return "N/A";
    return baselines[key];
}

function getColor(key, value, baselines) {
    if (value < baselines[key])
        return "color:red;";
    return "";
}

export {getBaseline, getColor};
