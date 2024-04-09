const updateJobBtn = document.querySelector("#updateJobBtn");

function updateJob() {
  // get all information from the input fields
  const inputs = document
    .querySelectorAll("input")
    .map((i) => ({ name: i.name, value: i.value }))
    .reduce((obj, item) => {
      obj[item.name] = item.value;
      return obj;
    }, {});

  console.log({ inputs });
  if (
    !inputs.nextRunYear ||
    !inputs.nextRunMonth ||
    !inputs.nextRunDay ||
    !inputs.nextRunHour ||
    !inputs.nextRunMinute ||
    !inputs.nextRunSecond
  ) {
    alert("The information about time of the next run is missing");
    return;
  }

  const nextRunAt = moment({
    year: inputs.nextRunYear,
    month: parseInt(inputs.nextRunMonth) - 1,
    day: inputs.nextRunDay,
    hour: inputs.nextRunHour,
    minute: inputs.nextRunMinute,
    second: inputs.nextRunSecond,
  });

  fetch("/scheduled/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      jobid: inputs?.jobid,
      nextRunAt,
      data: {
        title: inputs?.title,
        message: inputs?.message,
        url: inputs?.url,
        expireIn: parseInt(inputs?.expireIn),
      },
    }),
  })
    .then((res) => {
      if (res.url && res.ok) {
        console.log(res.url);
        window.location = res.url;
      }
      console.log("success");
    })
    .catch((err) => {
      console.log(err);
    });
}

updateJobBtn.addEventListener("click", updateJob);
