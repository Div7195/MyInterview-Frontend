import React from 'react'
import { useState ,useContext} from 'react'
import {Box,Button,TextField,styled,Typography} from '@mui/material'
import {API} from '../../service/api.js'
import { DataContext } from '../../context/DataProvider.jsx'
import { useNavigate } from 'react-router-dom'
const MainContainer=styled(Box)`
    width:400px;
    margin:auto;
    box-shadow:5px 2px 5px 2px rgb(0 0 0 / 0.6);
    ;
    
`
const Image=styled('img')({
    width:100,
    margin:'auto',
    display:'flex',
    padding:'50px 0 0'
})

const SubContainer=styled(Box)`
    padding:25px 35px;
    display:flex;
    flex-direction:column;
    & > div,& > button,& > p{
        margin-top:20px;
    }

`
//we did &>div cuz we wanted to give margin to button,and we just inspected it in browser, we find that its wrapped in a div,so we jsut select that div with the selector above and apply the css to it,and we could also do it with &>button,it may be a Button component,but its actually a html button element
//typography is actually a p element,its a functional component so we can pass it props and modify its apperance

const LoginButton=styled(Button)`
    text-transform:none;
    background:black;
    color:#41ef1a;
    height:48px;
    border-radius:2px;
    &:hover{
        background-color:#41ef1a;
        color:black;
    }
    font-size:15px;

`
const SignupButton=styled(Button)`
    text-transform:none;
    background-color:black;
    color:#41ef1a;
    height:48px;
    border-radius:2px;
    box-shadow:0 2px 4px 0 rgb(0 0 0 / 20%);
    &:hover{
        background-color:#41ef1a;
        color:black;
    }
`;

const ErrorComponent=styled(Typography)`
    font-size:10px;
    color:#ff6161;
    line-height:0;
    margin-top:10px;
    font-weight:600;
`

const Text=styled(Typography)`
    color:#878787;
    font-size:16px;
    
`
const signupInitialValues={
    name:'',
    username:'',
    password:''
}
const loginInitialValues={
    username:'',
    password:''
}


const Login = ({isUserAuthenticated}) => {
    const imageURL = 'https://cdn.pixabay.com/photo/2015/11/02/12/31/interview-1018333__340.png'; 
    const [account, toggleAccount] = useState('login')
    const [signupEntries, setSignup] = useState(signupInitialValues)
    const [loginEntries, setLogin] = useState(loginInitialValues)
    const {setAccount} = useContext(DataContext);
    const [error, setError] = useState('')
    const navigate=useNavigate();

    const toggleSignup=()=>{
        account==='login'?toggleAccount('signup'):toggleAccount('login')
    }
    const onInputChange=(e)=>{
        setSignup({...signupEntries,[e.target.name]:e.target.value})
    }
    const onValueChange=(e)=>{
        setLogin({...loginEntries,[e.target.name]:e.target.value})
        
    }

    const signupApiRequest=async ()=>{
        let response = await API.userSignup(signupEntries);
        if(response.isSuccess){
            setError('')
            setSignup(signupInitialValues);
            toggleAccount('login')

        }
        else{
            setError('Something went wrong either with the response or the request')
        }
    }
    const loginApiRequest=async()=>{
        let response = await API.userLogin(loginEntries);
        if(response.isSuccess){
            setError('');  
            sessionStorage.setItem('accessToken',`Bearer ${response.data.accessToken}`); 
            sessionStorage.setItem('refreshToken',`Bearer ${response.data.refreshToken}`);  
            setAccount({username: response.data.username , name: response.data.name})    
            isUserAuthenticated(true);
            navigate('/');  

        }
        else{
            setError('Something went wrong either with response or the request');
        }
    }


  return (
    <MainContainer>
        <Box>
            <Image src={imageURL} alt='login'/>        
            {
                account==='login' ?       
                    
                     <SubContainer>
                        <TextField variant='standard' value={loginEntries.username} label='Enter Username' onChange={(e)=>onValueChange(e)} name='username'/>
                        <TextField variant='standard' value={loginEntries.password} label='Enter Password' onChange={(e)=>onValueChange(e)} name='password'/>

                        { error && <ErrorComponent>{error}</ErrorComponent>}

                        <LoginButton variant='contained' onClick={()=>loginApiRequest()}>Login</LoginButton>
                        <Text style={{textAlign:'center'}}>OR</Text>
                        <SignupButton onClick={()=>toggleSignup()}>Create An Account</SignupButton>
                    </SubContainer>
                :

                    <SubContainer>
                        <TextField variant='standard' onChange={(e)=>onInputChange(e)} label='Enter Name' name='name'/>
                        <TextField variant='standard' onChange={(e)=>onInputChange(e)} label='Enter Username' name='username'/>
                        <TextField variant='standard' onChange={(e)=>onInputChange(e)} label='Enter Password' name='password'/>

                        { error && <ErrorComponent>{error}</ErrorComponent>}

                        <SignupButton onClick={() => signupApiRequest()}>Signup</SignupButton>
                        <Text style={{textAlign:'center'}}>OR</Text>
                        <LoginButton variant='contained'onClick={()=>toggleSignup()} >Already Have an Account</LoginButton>
                    </SubContainer>
        }
        </Box>
    </MainContainer>
  )
}

export default Login