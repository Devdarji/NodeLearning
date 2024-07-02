const { getAllLaunches, addNewLaunch } = require("../../models/launches.model");

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
  const launch = req.body;

  if (!launch.destination || !launch.rocker || !launch.launchDate || !launch.mission) {
    return res.status(400).json({
      error: "Invalid Launch Property",
    });
  }

  launch.launchDate = new Date(launch.launchDate);

  if (isNaN(launch.launchDate)){
    return res.status(400).json({
      error: "Invalid Launch Date",
    });
  }

  addNewLaunch(launch);

  return res.status(201).json(launch);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
};
