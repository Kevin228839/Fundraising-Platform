import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../../api';
import Load from '../../Global/Loading';
import { TimeDiff } from '../../utils';

const Wrap = styled.div`
display:flex;
justify-content:center;
margin-top:50px;
width:100%;`;

const Container = styled.div`
width:1280px;
display:flex;
justify-content:center;
margin-left:auto;
margin-right:auto;
padding-top:50px;`;

const Left = styled.div`
width:55%;`;

const Right = styled.div`
width:45%;`;

const ProjectImg = styled.img`
margin-left:auto;
margin-right:auto;
display:block;
width:380px;
height:500px;`;

const ProjectName = styled.div`
padding:10px;
font-size:40px;
font-family:Arial;`;

const ProjectCategory = styled.div`
padding-left:10px;
padding-right:10px;
font-size:20px;
color:grey;
font-family:Helvetica;`;

const ProjectOwner = styled.div`
padding-left:10px;
font-size:20px;
color:grey;
font-family:Tahoma;`;

const ProjectDetail = styled.div`
width:60%;
margin-top:40px;
padding:10px;
font-size:15px;
font-family:Helvetica;`;

const ProjectRaisingTarget = styled.div`
padding:10px;
font-family:Verdana;
font-size:15px;
color:grey;`;

const ProjectDayRemain = styled.div`
padding-left:10px;
color:grey;
font-family:Verdana;
font-size:15px;`;

const DonateButton = styled.button`
margin-top:20px;
padding:10px;
width:200px;
height:70px;
border:solid 1px #888888;
border-radius: 5px;
font-size:20px;`;

const StyledLink = styled(Link)`
letter-spacing:1em;
font-size:20px;
color:black;
text-decoration:none;`;

const Project = () => {
  const id = useParams().id;
  const [projectData, setProjectData] = useState(null);
  useEffect(() => {
    const fetchProjectData = async () => {
      let response = await api.getProjectDetail(id);
      response = await response.json();
      setProjectData(response.data.res[0]);
    };
    fetchProjectData();
  }, []);
  console.log(projectData);

  if (projectData === null) {
    return <Load />;
  } else {
    return (
      <Wrap>
        <Container>
          <Left>
            <ProjectImg src={projectData.project_image} />
          </Left>
          <Right>
            <ProjectName>{projectData.project_name}</ProjectName>
            <ProjectCategory>類別: {projectData.project_category}</ProjectCategory>
            <ProjectOwner>提案人: {projectData.project_admin}</ProjectOwner>
            <ProjectDetail>{projectData.project_detail}</ProjectDetail>
            <ProjectDayRemain>剩下{ TimeDiff(new Date(), projectData.project_end_time) }天</ProjectDayRemain>
            <ProjectRaisingTarget>目標: NT$ {projectData.project_target_amount}</ProjectRaisingTarget>
            <StyledLink to={'/project/' + id + '/swap'}>
              <DonateButton>我要贊助</DonateButton>
            </StyledLink>
            <StyledLink to={'/project/' + id + '/redeem'}>
              <DonateButton>我要兌換</DonateButton>
            </StyledLink>
          </Right>
        </Container>
      </Wrap>
    );
  }
};

export default Project;
