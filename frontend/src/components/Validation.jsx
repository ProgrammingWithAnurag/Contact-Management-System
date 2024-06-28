export default function Validation(values){
      let errors = {}

      const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

      if(values.username === ""){
            errors.username = "Name should not empty"
      }else if(values.username.length < 3 || values.username.length > 30){
            errors.username = "Name must be between 3-30 length"
      }else{
            errors.username = ""
      }

      if(values.email === ""){
            errors.email = "Email should not empty"
      }else if(!email_pattern.test(values.email)){
            errors.email = "Invalid Email"
      }else{
            errors.email = ""
      }

      if(values.password === ""){
            errors.password = "Password should not empty"
      }else if(!password_pattern.test(values.password)){
            errors.password = "Use 1 small char 1 capital char a number to {8}"
      }else{
            errors.password = ""
      }

      return errors;
}