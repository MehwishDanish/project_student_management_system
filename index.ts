

import inquirer from "inquirer";


// Define the student class
class Student{
    static counter = 10000;
    id: number;
    name: string;
    courses: string[];
    balance: number;

    constructor(name: string){
        this.id=Student.counter++;
        this.name=name;
        this.courses=[];  
        this.balance=100;
    }
    // method to enroll a student in a courses
    enroll_course(courses: string){
        this.courses.push(courses);
    }

    // method to view a student balance
    view_balance(){
       console.log(`Balance for ${this.name} : $${this.balance}`);
    
   }
   // method to pay student fees
   pay_fees(omount: number){
       this.balance = omount;
       console.log(`$$(omount) fees paid successfully for ${this.name}`);
       console.log(`Remaining Balance: ${this.balance}`);
        
    }
    // method to display student status
    show_student(){
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Course: ${this.name}`);
        console.log(`Balance: ${this.balance}`);
    }
}
// Defining a student_manager clsss to manage students
class Student_manager{
    students: Student[]
    constructor(){
       this.students = []; 
    }
    // method to add a new student
    add_student(name: string){
        let student = new Student(name);
        this.students.push(student);
        console.log(`student: ${name} addad successfully.student ID: ${student.id}`);
    }
    //  method to enrolla student in a course
    enroll_student(student_id: number,course: string){
        let student = this.find_student(student_id);
        if (student){
           student.enroll_course(course);
           console.log(`${student.name} enrolled in ${course} successfully`);  
        }

    }
    //  method to view a student balance
    view_student_balance(student_id: number){
        let student = this.find_student(student_id);
        if (student){
        student.view_balance();
        }
        else{
             console.log("student not fond.place enter a correct student id");
        
        }
    
    }
    // method to pay student fees
     pay_student_fees(student_id: number, omaunt: number){
         let student = this.find_student(student_id);
         if(student){
            student.pay_fees(omaunt);
        }
        else{
             console.log("studennt not found. plase enter a correct student id");
    
        }
    }
    // method to display student status
    show_student_status(student_id: number){
         let student = this.find_student(student_id);
        if (student){
            student.show_student();
        }
    }
    // method to find a student by course_id
    find_studend(student_id: number){
        return this.students.find(std => std.id === student_id );
    }
}
// main function  to run the program
async function main(){
    console.log("welcome to 'codewithMehwish'- student management system");
    console.log("-".repeat(50));
    
    let student_manager = new Student_manager();
    //    while loop to choose an option
    while(true){
        let choice = await inquirer.prompt([
           {
                name: "choice",
                type: "list",
                message: "select an option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit"
                ]
            }
        ]);
          // using switch case to handle user choice
        switch(choice.choice){
           case"Add Student":
               let name_input = await inquirer.prompt([
                    {
                      name: "name",
                      type: "input",
                      message: "Enter a student Name",
                    }   
            ]);
            student_manager.add_student(name_input.name);
            break;
            case "Enroll student":
                let course_input = await inquirer.prompt([
                    {
                            name: "student_id",
                            type: "number",
                            message: "Enter a student id",
                    },
                    {
                            name: "course",
                            type: "input",
                            message: "Enter a course Name",

                    } 
                ]);
                student_manager.enroll_student(course_input.student_id, course_input.course);
                break;
            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    }
                ]);
                student_manager.view_student_balance(balance_input.student_id);
                break;
            case "pay Fees":
                let fees_input = await inquirer.prompt([
                   {
                       name: "student_id",
                       type: "number",
                       message: "Enter a student ID",
                   },
                   {
                       name: "amuunt",
                       type: "number",
                       message: "Enter the amount to pay"
                   }
                ]);
                student_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
                break;
                
            case "show status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID",
                    }
                ]); 
                student_manager.show_student_status(status_input.studennt_id);
                break; 
            case "Exit":
                console.log("Exiting...");
                process.exit();               

        } 
    }
}
// calling a main function
main();
