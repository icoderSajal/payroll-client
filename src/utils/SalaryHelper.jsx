export const colums = [
  {
    name: "S No.",
    selector: (row) => row.sno,
    sortable: true,
  },
  {
    name: "Emp ID",
    selector: (row) => row.employeeId,
    sortable: true,
  },
  {
    name: "Basic Salary",
    selector: (row) => row.basicSalary,
  },
  {
    name: "Allowance",
    selector: (row) => row.allowances,
  },
  {
    name: "Deductions",
    selector: (row) => row.deductions,
  },
  {
    name: "Total",
    selector: (row) => row.netSalary,
  },
];
