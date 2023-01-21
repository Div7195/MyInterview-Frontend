import React from 'react'
import { Box } from '@mui/material'
import {Typography,styled} from '@mui/material'
import { addElipsis } from '../../../utils/common-utils'
import { useState,useEffect } from 'react'
import { API } from '../../../service/api'
const Container = styled(Box) `
    border : 1px solid #d3cede;
    border-radius : 10px;
    margin:10px;
    height:250px;
    display:flex;
    align-items:center;
    flex-direction:column;
    & > p{
        padding : 0 5px 5px 5px;
    }
    box-shadow:0 2px 4px 0 rgb(0 0 0 / 40%);
`
const Image = styled('img')({
    width:'100%',
    borderRadius:'10px 10px 0 0',
    objectFit:'cover',
    height:130

});

const Text = styled(Typography)`
    color:#878787;
    font-size:15px;
    font-weight:bold;

`
const Heading = styled(Typography)`
    font-size:18px;
    font-weight:600;
`
const Details = styled(Typography)`
    font-size:14px;
    word-break:break-word;
`

const Post = ({post}) => {

    const [imageUrl, setImageUrl] = useState('')

    useEffect(() => {
        const fetchPostsData=async ()=>{
             let response  = await API.findCompany({companyName: post.companyName || ''});
             console.log('oh fuck off')
             if(response.isSuccess){
                setImageUrl(response.data);
             }
         }
         fetchPostsData();
     }, [post])

    const url = imageUrl ? imageUrl : 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80'

    

  return (
    <Container>
        <Image src={url} alt='blog'/>
        <Text>{post.companyName}</Text>
        <Heading>{`Role: ${addElipsis(post.role , 30)}`}</Heading>
        <Text>{`Eligiblity: ${post.eligibility}`}</Text>
        <Details>{addElipsis(post.description , 100)}</Details>
    </Container>
  ) 
}

export default Post