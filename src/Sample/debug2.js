import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Page from '../Schedule_1/SchedulePage'
import styled from 'styled-components';
import NavBar from '../mainpage/NavBar';

const Background = styled.div`
  background-image: url('/loginpage_background.png');
  background-size: cover;
  width: 100%;
  height: 100vh;
  background-position: center center;
`;

const MainWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

const MapWrapper = styled.div`
  width: 640px;
  height: 300px;
  margin-right: 20px;
  background-color: #DDFFFF77;
`;

const ScheduleWrapper = styled.div`
  display: flex;
  flex: 1;
`;


function FillExample() {
  return (
    <Background>
      <NavBar />
    <Tabs
      defaultActiveKey="profile"
      id="fill-tab-example"
      className="mb-3"
      fill
    >
      <Tab eventKey="home" title="Home">
        <Page/>
      </Tab>
      <Tab eventKey="profile" title="Profile">
        Tab content for Profile
      </Tab>
      <Tab eventKey="longer-tab" title="Loooonger Tab">
        Tab content for Loooonger Tab
      </Tab>
      <Tab eventKey="contact" title="Contact" disabled>
        Tab content for Contact
      </Tab>
    </Tabs>
    </Background>
  );
}

export default FillExample;