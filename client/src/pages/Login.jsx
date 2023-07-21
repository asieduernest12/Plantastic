import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { useMutation} from '@apolo/client';
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";


export default function Login(){
    const[userFormData, setUserFormData] = useState({email: '', password: ''});
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setUserFormData({
            ...userFormData,
            [name]: value,
        });
    }
    const [loginUser, {error}] = useMutation(LOGIN_USER);
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if(form.checkValidity() === false){
            event.preventDefault();
            event.stopPropagation();
        }
        try{
            const response = await loginUser({
                variables: {...userFormData}
            });
            const {token, user} = response.data.login;
            Auth.login(token);
        } catch(err){
            
            setShowAlert(true);
        }
        setUserFormData({
            username: '',
            email: '',
            password: '',
        });
};

    return( 
    <div>
           
            </div>
        );
};
// import { User } from "../models/User";

// export default function Login(){
//    const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [passwordHasErr, setPasswordHasErr] = useState(false);
//     const [usernameHasErr, setUsernameHasErr] = useState(false);
//     const history = useHistory();
    
    
//     function handleUsernameChange(e){
//         setUsername(e.target.value);
//     }
    
//    function handlePasswordChange(e){
//         setPassword(e.target.value);
//     }
//     // verify if user exists username and password matches the database
//     // function handleLogin(e){
//     //     e.preventDefault();
//     //     // if username and password are correct
//     //     // redirect to dashboard else display error message
        
//     // }
//     async function handleLogin(e){
//         e.preventDefault();
//         try{
//             const user = await User.findOne({username: username}, {password: password});
//             if(user){
//                 handleLoginSuccess();
//             } else {
//                 setUsernameHasErr(true);
//                 setPasswordHasErr(true);
//             }
//         } catch(err){
//             console.log(err);
//             throw err;
//         }
//     }
//      function handleUsernameBlur(){
//         const regexUsername = /^[a-zA-Z0-9]+$/;
//         if(!regexUsername.test(username)){
//             setUsernameHasErr(true);
//         } else {
//             setUsernameHasErr(false);
//         }
//     }

//     // if username and password are correct
//     function handleLoginSuccess(){
//         // confirm if user exists in the database
//         // if user exists redirect to dashboard
//         // else display error message
//         // if(username === User.username && password === User.password){
//         //     history.push("/dashboard");
//         // } else {
//         //     alert("Incorrect username or password");
//         // if(!usernameHasErr && !passwordHasErr){
//         //     // redirect to dashboard

//         // }
//         history.push("/dashboard");

//     }
   
//     return( <div>
//        <h1> I am the Login page.</h1>
//        <div>
//        <form onSubmit={handleLogin}>
//         <div>
//             <label htmlFor="username" className="form-label">Username</label>
//             <input type="text" className="form-control" id="username" placeholder="username" value={username} onChange={handleUsernameChange} onBlur=
//             {handleUsernameBlur}  />
//             {usernameHasErr && <p className="text-danger">Incorrect password or email</p>}
//         </div>
//          <div>
//             <label htmlFor="password" className="form-label">
//                 Password:</label>
//             <input type="password" className="form-control" id="password" placeholder="password" value = {password}
//             onChange={handlePasswordChange}  />
//             <p>Incorrect email or password </p>
//             <p>
              
//             </p>
//             {passwordHasErr && <p className="text-danger">Please enter a valid password.</p>}
//         </div>
//         <button type="submit" className="btn btn-primary">Login</button>

//        </form>
//        </div>
//         </div>
//         )
// }