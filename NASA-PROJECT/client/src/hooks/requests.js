const API_URL = "http://localhost:8000";

// Load planets and return as JSON.
async function httpGetPlanets() {

  const response = await fetch(`${API_URL}/planets`);
  const data = await response.json();
  return data;
}

async function httpGetLaunches() {
  // TODO: Once API is ready.
  // Load launches, sort by flight number, and return as JSON.

  const response = await fetch(`${API_URL}/launches`);
  const data = await response.json();

  console.log(data)

  return data.sort((a,b) => {
    return a.flightNumber - b.flightNumber
  })
}

async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${API_URL}/launches`, {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch)
    })
  } catch (error) {
    console.log(error);
    return {
      ok: false
    }
  }
}

async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API_URL}/launches/${id}`, {
      method: "delete"
    })
  } catch (error) {
    console.log(error);
    return {
      ok: false
    }
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
