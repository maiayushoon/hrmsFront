export interface Employee {
  _id?: string;
  employeeId: string;
  fullName: string;  
  email: string;
  department: string;
}

export interface Attendance {
  _id?: string;
  employeeId: string;
  date: string; 
  status: "Present" | "Absent";
}