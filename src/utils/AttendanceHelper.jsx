export const colums = [
  {
    name: "S No.",
    selector: (row) => row.sno,
    sortable: true,
    width: "100px",
  },
  {
    name: "Employee ID",
    selector: (row) => row.empId,
    sortable: true,
    width: "100px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    width: "150px",
  },
  {
    name: "Date",
    selector: (row) => row.attDate,
    sortable: true,
    width: "150px",
  },
  {
    name: "Login",
    selector: (row) => row.loginTime,
    sortable: true,
    width: "120px",
  },

  {
    name: "Logout",
    selector: (row) => row.logoutTime,
    width: "100px",
  },
  {
    name: "Working Hours",
    selector: (row) => row.workingHours,
    center: "true",
  },
  {
    name: "Status",
    selector: (row) => row.status,
    sortable: true,
  },
];
