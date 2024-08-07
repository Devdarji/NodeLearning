const {
  getAllLaunches,
  scheduleNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
} = require("../../models/launches.model");

async function httpGetAllLaunches(req, res) {
  return res.status(200).json(await getAllLaunches());
}

async function httpAddNewLaunch(req, res) {
  const launch = req.body;

  if (
    !launch.target ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.mission
  ) {
    return res.status(400).json({
      error: "Invalid Launch Property",
    });
  }

  launch.launchDate = new Date(launch.launchDate);

  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid Launch Date",
    });
  }

  await scheduleNewLaunch(launch);

  return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
  const launchId = +req.params.id;

  if (!existsLaunchWithId(launchId)) {
    return res.status(404).json({
      error: "Launch Not Found!",
    });
  }

  const aborted = abortLaunchById(launchId);
  return res.status(200).json(aborted);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
