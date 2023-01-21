import React from 'react'
import { Box,styled,FormControl,Button,TextareaAutosize ,TextField, Input,InputBase} from '@mui/material'
import {Edit , Delete} from '@mui/icons-material';
import { useState,useEffect,useContext } from 'react';
import { API } from '../../service/api'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { DataContext } from '../../context/DataProvider';
import { companyData } from '../../constants/data.js'
import Autocomplete from '@mui/material/Autocomplete';
import Comment from './comments/Comment';

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

const EditIcon=styled(Edit)`
  margin:5px;
  padding:5px;
  border:1px solid #878787;
  border-radius:10px;
  
`
const DeleteIcon=styled(Delete)`
  margin:5px;
  padding:5px;
  border:1px solid #878787;
  border-radius:10px;
  float:right;
`;
const CommentBox = styled(Box)`

border:1px solid black;
background-color:white;
`
const InputTextField=styled(InputBase)`
    flex:1;
    margin:0px 30px;
    font-size:18px;
    
`;
const CommentContainer=styled(FormControl)`
    margin-top:10px;
    display:flex;
    flex-direction:row;
    padding-bottom:8px;
`;

const commentIntialValues={
  username:'',
  postId:'',
  description:'',
  createdDate:new Date() 
}

const DetailedPost = () => {
    
    const [postData, setPostData] = useState({})
    const [comments, setComments] = useState([])
    const [commentInput, setCommentInput] = useState(commentIntialValues)
    const navigate = useNavigate();
    const {account}=useContext(DataContext);
    const {id} = useParams();
    commentInput.username = account.username
    commentInput.postId = id;


    useEffect(() => {
        const fetchBlogData = async ()=>{
          
          let response = await API.getPostById(id);
          if(response.isSuccess){
            setPostData(response.data);
          }
        }
        const fetchCommentsData = async ()=>{

          let response = await API.getComments(id);
          if(response.isSuccess){
            setComments(response.data);
          }
        }    
        fetchBlogData();
        fetchCommentsData();
      }, [])

      const deleteBlog=async()=>{
        let response = await API.deletePost(postData._id);
        
        if(response.isSuccess){
          navigate('/');
        }
      }
      const handleChange = (e)=>{
        setCommentInput({...commentInput, [e.target.name] : e.target.value})
        console.log(commentInput);
    
      }
      const saveComment = async() => {
        commentInput.username = account.username
        commentInput.postId = id;
        let response = await API.createComment(commentInput);
        if(response.isSuccess){
          let getresponse = await API.getComments(id);
          setCommentInput(commentIntialValues)
          if(getresponse.isSuccess){
            setComments(getresponse.data);
          }
        }
      }
    
  return (
    
    <MainContainer>
        
    <StyledFormControl>
    <Box>
          {
            account.username === postData.username &&
            <>
              <Link to={`/update/${postData._id}`}>
                  <EditIcon color='primary'/>
                  <DeleteIcon onClick={()=>{deleteBlog()}} color='error'/>
              </Link>
              
            </>
          }
          
    </Box>
    <LabelOfInput>Company Name:</LabelOfInput>
    <InputBox value={postData.companyName}></InputBox>

    <LabelOfInput>Role:</LabelOfInput>
    <InputBox value={postData.role}></InputBox>

    <LabelOfInput>Eligibility Criteria:</LabelOfInput>
    <InputBox value={postData.eligibility}></InputBox>

    <LabelOfInput>Format of Interview:</LabelOfInput>
    <InputBox value={postData.format}></InputBox>

    <LabelOfInput>Detailed Description:</LabelOfInput>
    <TextArea minRows={5} value={postData.description}>{postData.description}</TextArea>

    <LabelOfInput>Suggestions:</LabelOfInput>
    <TextArea minRows={3} value={postData.suggestions}>{postData.suggestions}</TextArea>
    {/* <Button variant='contained'onClick={()=>savePost()} >Publish</Button> */}

    {/* <InputBox onChange={(e)=>{handlecompany(e)}} name='companyName' minRows={3} placeholder='company name'></InputBox>
    <Button variant='contained'onClick={()=>saveCompany()} >Publish</Button> */}
    <LabelOfInput>Comments:</LabelOfInput>
      <CommentBox>
            <CommentContainer>
            <InputTextField placeholder='Comment something..' value={commentInput.description} onChange={(e)=>{handleChange(e)}}  name='description'/>
            <Button variant='contained' onClick={()=>saveComment()} >Comment</Button>
            </CommentContainer>
      </CommentBox>

        {
          comments && comments.length > 0 ? comments.map(comment => (

          <Comment comment={comment}/>
        ))
        :
            <Box style={{ color:'#878787', margin:'30px 80px', fontSize:18 }}>No comments available to display</Box>
        }


    </StyledFormControl>
    </MainContainer>
    
  )
}

export default DetailedPost