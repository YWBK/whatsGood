  import {signup} from "./session_api_util"
  
  
  export const seeds = () =>{
    const users = ["DemoUser", "Bill", "Ethan", "Katie", "Steven", "Cathy", "Oliver", "James", "Lucas", "Isabella", 
                   "Charlotte", "Noah", "Logan", "Kirby", "Alex", "Amin", "Maddie", "Sammy", "David", "Sarah"]
    
    for (let i = 0; i < users.length; i++) {
      const data = {
        username: users[i],
        email: `${users[i]}@yahoo.com`,
        password: "123456",
        password2: "123456",
      }
      signup(data)          
    }
    return "Complete"
}
  
   
    
    