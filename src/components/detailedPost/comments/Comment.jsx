import React from 'react'
import { Box, styled, Typography } from '@mui/material'

const Container = styled(Box)`
    margin-top:30px;
    
    
`
const UpperContainer = styled(Box)`
    display:flex;
    flex-direction:row;
    background-color:#f5c592;
    border-radius:10px;
`
const CommentAuthor = styled(Typography)`
    
    font-size:15px;
    font-weight:bold;
    
`
const CommentBody = styled(Typography)`
    background-color:#d2f3b3;
    font-size:20px;
    border-radius:10px;
`
const CommentDate = styled(Typography)`
    
    margin-left:500px;
    font-size:12px;
    font-weight:bold;
`

const Comment = ({comment}) => {
  return (
    <Container>
        <UpperContainer>
            <CommentAuthor>-By {comment.username}</CommentAuthor>

            <CommentDate>-{new Date(comment.createdDate).toDateString()}</CommentDate>
        </UpperContainer>       
        <CommentBody>{comment.description}</CommentBody>
    </Container>
  )
}

export default Comment