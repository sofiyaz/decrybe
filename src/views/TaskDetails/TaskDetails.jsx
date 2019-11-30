import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab, Divider, colors } from '@material-ui/core';
import { Header, Overview } from './components';
import { observer, inject } from 'mobx-react';

import { Page } from '../../components'
import Error401 from '../Error401'
const useStyles = makeStyles(theme => ({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3)
  },
  tabs: {
    marginTop: theme.spacing(3)
  },
  divider: {
    backgroundColor: colors.grey[300]
  },
  alert: {
    marginTop: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(3)
  }
}));

const Task = observer((props) => {
  const classes = useStyles(1);
  const { id, tab } = props.match.params;
  const [openAlert, setOpenAlert] = useState(true);
  const [project, setProject] = useState(false);

  useEffect(() => {
    async function getTask () {
      
      let data = await props.rootStore.tasks.getTaskData(id)
      if (data) {
        
        setProject(data);
      } else {
        console.log('Task Details load error')
      }
    }
    if (props.rootStore.user.isLogin) {
      getTask()
    }
  }, []);

  const handleAlertClose = () => {
    setOpenAlert(false);
  };

  const handleTabsChange = (event, value) => {
    props.history.push(value);
  };

  const tabs = [
    { value: 'overview', label: 'Overview' }
  ];
  
  if (!tab) {
    return <Redirect to={`/tasks/${id}/overview`} />;
  }
  
 
  if (!tabs.find(t => t.value === tab)) {
    return <Redirect to="/errors/error-404" />;
  }
  

  if (!project) {
    return null;
  }
  
  return (
    <Page
      className={classes.root}
      title={`Task | ${project.title}`}
    >
     <Header project={project} />
     
     <Tabs
        className={classes.tabs}
        onChange={props.handleTabsChange}
        scrollButtons="auto"
        value={tab}
        variant="scrollable"
      >
        {tabs.map(tab => (
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
          />
        ))}
      </Tabs>
      <Divider className={classes.divider} />
      <div className={classes.content}>
        {tab === 'overview' && <Overview project={project} />}
      </div>
    </Page>
  );
});

@inject("rootStore")
@observer
class TaskDetails extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    if (this.props.rootStore.user.isLogin) {
      return (
        <Task match={this.props.match} history={this.props.history} rootStore={this.props.rootStore} />
      )
    } else {
      return (
        <Error401 />
      )
    }
  }
}

export default TaskDetails;
