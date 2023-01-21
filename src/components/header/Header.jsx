import React from 'react'
import { useState } from 'react'
import { AppBar,Toolbar,Typography,styled, Input,TextField, Button } from '@mui/material'
import { companyData } from '../../constants/data.js'
import Autocomplete from '@mui/material/Autocomplete';
import {Link} from 'react-router-dom'
const Header = () => {

const Component=styled(AppBar)`
    background-color:black;
    box-shadow:none;
    
`
const Container=styled(Toolbar)`
    & > a{
        padding: 20px;
        color: inherit;
        text-decoration:none;
        
    }
    
    
    
    border:2px solid cyan;
    font-size:18px;
    color:#41ef1a;
`;

const ButtonBox = styled(Link)`
    margin-right:20px;
    background-color:purple;
    &:hover{
        background-color:#561556;
    }
    font-size:20px;
`
// const searchCompanies = async() => {
//     let response = await API.findCompany(postEntries);
//     if(response.isSuccess){
//         navigate('/')
//     }
// }
    const [value, setValue] = React.useState('');
    const [inputValue, setInputValue] = React.useState('');

    // const handleChange = (e)=>{
    //     setCompanyValues({...inputValue,[e.target.name] : e.target.value})
    //     console.log(inputValue);
    // }
    const AutoComplete = styled(Autocomplete)`
    
    background-color :white;
`
    
  return (
    <>
    <Component>
        <Container>
            <Link to='/'>HOME</Link>
            <Link to='/create'>POST YOUR EXPERIENCE</Link>
            <Link to='/personal/posts'>YOUR POSTS</Link>
            <Link to='/login'>LOGOUT</Link>
            {/* <InputBox placeholder='Enter Company Name'></InputBox> */}
            <AutoComplete
            freeSolo
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          console.log(inputValue)
        }}
        id="controllable-states-demo"
        options={companyData}
        
        forcePopupIcon={true}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Select Company" />}
      />
            {/* <ButtonBox onClick={} variant="contained">Search</ButtonBox> */}
            <ButtonBox to={`/?company=${inputValue}`}>Search</ButtonBox>
        </Container>
        
    </Component>
    </>
  )
}

export default Header