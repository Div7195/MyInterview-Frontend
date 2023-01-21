import React from 'react'
import { Box,styled,FormControl,Button,TextareaAutosize ,TextField, Input} from '@mui/material'
import { useState,useEffect,useContext } from 'react';
import { API } from '../../service/api'
import { useNavigate } from 'react-router-dom'
import { DataContext } from '../../context/DataProvider';
import { companyData } from '../../constants/data.js'
import Autocomplete from '@mui/material/Autocomplete';
const InputBox = styled(Input)`
    color:white;
    border:3px solid #41ef1a;
    font-size:18px;
    padding:5px;
    border-radius:15px;
    margin-bottom:20px;
`
const StyledFormControl=styled(FormControl)`
    width:50%;
    margin-top:50px;
    margin-left:380px;
    
`;
const TextArea = styled(TextareaAutosize)`
    border:3px solid #41ef1a;
    margin-bottom:20px;
    font-size:18px;
    &:focus-visible{
        outline:none;
    }
`
const LabelOfInput = styled(Box)`
    margin-bottom:5px;
    font-size:20px;
    color:white;
`
const MainContainer = styled(Box)`
    background-color:black;
    width:100%;
    margin:0px
`
const AutoComplete = styled(Autocomplete)`
    margin-bottom:20px;
    background-color :white;
    width:350px;
`
const postIntialValues={
    companyName:'',
    role:'',
    eligibility:'',
    format:'',
    description:'',
    companyLogo:'',
    username:'',
    suggestions:'',
    createdDate:new Date()
    
}

const companyvalues = {
    companyName:'',
    companyLogo:'',
}


const CreateInterviewPost = () => {
    
    const [postEntries, setPost] = useState(postIntialValues);
    const [companyEntries, setcompany] = useState(companyvalues);
    const [value, setValue] = React.useState('');
    const [inputValue, setInputValue] = React.useState('');
    const navigate = useNavigate();
    const {account}=useContext(DataContext);
    postEntries.username = account.username
    postEntries.companyName = inputValue

    const handleChange=(e)=>{
        setPost({...postEntries,[e.target.name] : e.target.value})
        console.log(postEntries)
    }
    // const handlecompany=(e)=>{
    //     setcompany({...companyEntries,[e.target.name] : e.target.value})

    // }

    const savePost = async() => {
        let response = await API.createPost(postEntries);
        if(response.isSuccess){
            navigate('/')
        }
    }
    
    // const saveCompany = async() => {
    //     let response = await API.createCompany(companyEntries);
    //     if(response.isSuccess){
    //         navigate('/')
    //     }
    // }

  return (
    <MainContainer>
    <StyledFormControl>
    <LabelOfInput>Company Name:</LabelOfInput>
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
        sx={{ width: '755px' }}
        renderInput={(params) => <TextField {...params} label="Select Company" />}
      />

    {/* <LabelOfInput>Company Name:</LabelOfInput>
    <InputBox onChange={(e)=>{handleChange(e)}} name='companyName'></InputBox> */}

    <LabelOfInput>Role:</LabelOfInput>
    <InputBox onChange={(e)=>{handleChange(e)}} name='role' placeholder='Enter Position/Role'></InputBox>

    <LabelOfInput>Eligibility Criteria:</LabelOfInput>
    <InputBox onChange={(e)=>{handleChange(e)}} name='eligibility' placeholder='Eligbility'></InputBox>

    <LabelOfInput>Format of Interview:</LabelOfInput>
    <InputBox onChange={(e)=>{handleChange(e)}} name='format' placeholder='Enter Format'></InputBox>

    <LabelOfInput>Detailed Description:</LabelOfInput>
    <TextArea onChange={(e)=>{handleChange(e)}} name='description' minRows={5} placeholder='Write a Description'></TextArea>

    <LabelOfInput>Suggestions:</LabelOfInput>
    <TextArea onChange={(e)=>{handleChange(e)}} name='suggestions' minRows={3} placeholder='Any Suggestions'></TextArea>
    <Button variant='contained'onClick={()=>savePost()} >Publish</Button>

    {/* <InputBox onChange={(e)=>{handlecompany(e)}} name='companyName' minRows={3} placeholder='company name'></InputBox>
    <Button variant='contained'onClick={()=>saveCompany()} >Publish</Button> */}


    </StyledFormControl>
    </MainContainer>
    
  )
}

export default CreateInterviewPost