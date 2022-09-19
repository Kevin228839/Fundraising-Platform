// import styled from 'styled-components';
import { useState, useEffect } from 'react';
import api from '../../api';
import Load from '../../Global/Loading';
import List from './List';

const Home = ({ page, setPage }) => {
  const [projectList, setProjectList] = useState(null);
  useEffect(() => {
    const fetchProjectList = async () => {
      let response = await api.getProjectList(page);
      response = await response.json();
      setProjectList(response);
    };
    fetchProjectList();
  }, [page]);

  if (projectList === null) {
    return <Load />;
  } else {
    return <List projectList={projectList} setPage={setPage} page={page}/>;
  }
};

export default Home;
