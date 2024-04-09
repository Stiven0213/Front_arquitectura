export class User {
  name: string;
  lastname: string;
  email: string;
  age: number;
  code_teacher: string;

  constructor(
    name: string = '',
    lastname: string = '',
    email: string = '',
    age: number = 0,
    code_teacher: string = ''
  ) {
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.age = age;
    this.code_teacher = code_teacher;
  }
}
