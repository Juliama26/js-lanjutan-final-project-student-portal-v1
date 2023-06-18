async function process_argv() {
  let { argv } = process;
  argv = argv.slice(2);
  const test = await studentActivitiesRegistration(argv);

  return test;
}

async function getStudentActivities() {
  const response = await fetch("http://localhost:3001/activities");
  const test = await response.json();
  return test;
}

async function studentActivitiesRegistration(data) {
  let test = data[0];
  if (test === "CREATE") {
    let name = data[1];
    let day = data[2];
    return addStudent(name, day);
  } else if (test === "DELETE") {
    let id = data[1];
    return deleteStudent(id);
  }
  // console.log(test);
}

async function addStudent(name, day) {
  const activ = await getStudentActivities(day);
  const newStudent = {
    name: name,
    activities: activ.map((activity) => ({
      name: activity.name,
      desc: activity.desc,
    })),
  };
  // console.log(activ);
  const postResponse = await fetch("http://localhost:3001/students", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newStudent),
  });
  // console.log(postResponse);
  return postResponse.json();
}

async function deleteStudent(id) {
  const response = await fetch(`http://localhost:3001/students/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

process_argv()
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

console.log(getStudentActivities());
module.exports = {
  studentActivitiesRegistration,
  getStudentActivities,
  addStudent,
  deleteStudent,
};
