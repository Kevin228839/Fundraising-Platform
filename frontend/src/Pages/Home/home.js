// import styled from 'styled-components';
import { useState, useEffect } from 'react';
import api from '../../api';
import Load from '../../Global/loading';

const Home = () => {
  const [projectList, setProjectList] = useState(null);
  useEffect(() => {
    const fetchProjectList = async () => {
      let response = await api.getProjectList();
      response = await response.json();
      setProjectList(response);
      console.log(response.data);
    };
    fetchProjectList();
  }, []);

  if (projectList === null) {
    return <Load />;
  }
  return (
    <div>13</div>
  );
};

export default Home;
