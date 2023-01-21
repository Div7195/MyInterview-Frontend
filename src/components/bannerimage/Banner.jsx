import React from 'react'
import { Box,Typography,styled } from '@mui/material';

const Container=styled(Box)`
    background-color:black;
    width:75%;
    margin:0px auto;

    height:30vh;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
`
const Heading=styled(Typography)`
    font-size:80px;
    color:#FFFFFF;
    line-height:1;

`
const SubHeading=styled(Typography)`
    font-size:18px;
    color:white;
    margin-top:2px;
`

const Banner = () => {

  return (
    
    <Container>
        <Heading>MyInterview</Heading>
        <SubHeading>One Stop Place For Interview Experiences</SubHeading>
    </Container>
  )
}

export default Banner