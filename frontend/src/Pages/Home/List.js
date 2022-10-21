import styled from 'styled-components';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { TimeDiff } from '../../utils';

const Container = styled.div`
margin-top:50px;
width:100%;`;

const Row = styled.div`
display:flex;
width:800px;
margin-left:auto;
margin-right:auto;`;

const ProjectContainer = styled.div`
background-color:#FCFCFC;
border-radius:5px;
margin:50px;
display:flex;
flex-direction:column;
width:300px;
height:350px;`;

const ProjectImg = styled.img`
padding:10px;
width:280px;
height:150px;
border-radius:15px;`;

const ProjectName = styled.div`
padding:10px;
font-size:20px;
font-family:Arial;`;

const ProjectOwner = styled.div`
padding-left:10px;
font-size:13px;
font-family:Tahoma;`;

const ProjectCategory = styled.div`
padding-left:10px;
padding-right:10px;
font-size:15px;
font-family:Helvetica;`;

const ProjectCaption = styled.div`
padding:10px;
font-size:10px;
font-family:Helvetica;`;

const FlexSpaceBetween = styled.div`
display:flex;
justify-content:space-between;
padding-left:10px;
padding-right:10px;`;

const ProjectDayRemain = styled.div`
font-family:Verdana;
font-size:15px;`;

const ProjectRaisingTarget = styled.div`
font-family:Verdana;
font-size:15px;`;

const ButtonRow = styled.div`
display:flex;
justify-content:center;`;

const PageNumber = styled.div`
margin-left:5px;
margin-right:5px;`;

const Space = styled.div`
width:100%;
height:80px;`;

const List = ({ projectList, setPage, page }) => {
  const data = projectList.data.res;
  const nextPage = projectList.data.nextPage;
  return (
    <Container>
      {_.chunk(data, 2).map((row, index) => {
        return (
          <Row key={index}>
            {
              row.map((project) => {
                return (
                  <ProjectContainer key={project.project_id}>
                    <Link to={'/project/' + project.project_id} >
                      <ProjectImg src={project.project_image}/>
                    </Link>
                    <ProjectName>{project.project_name}</ProjectName>
                    <ProjectCategory>{project.project_category}</ProjectCategory>
                    <ProjectOwner>{project.project_admin}</ProjectOwner>
                    <ProjectCaption>{project.project_caption}</ProjectCaption>
                    <FlexSpaceBetween>
                      <ProjectDayRemain>剩下{ TimeDiff(new Date(), project.project_end_time) }天</ProjectDayRemain>
                      <ProjectRaisingTarget>{project.project_target_amount}</ProjectRaisingTarget>
                    </FlexSpaceBetween>
                  </ProjectContainer>
                );
              })
            }
          </Row>
        );
      })}
      <ButtonRow>
      <button disabled={!(page)} onClick={() => setPage(page - 1)}>
        previous
      </button>
      <PageNumber>{page}</PageNumber>
      <button disabled={!nextPage} onClick={() => setPage(page + 1)}>
        next
      </button>
    </ButtonRow>
    <Space></Space>
    </Container>
  );
};

export default List;
