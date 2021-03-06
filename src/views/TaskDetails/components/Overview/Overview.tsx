import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import { Brief, Deliverables, Holder, Members } from './components';
import { observer, inject } from 'mobx-react';
const useStyles = makeStyles(theme => ({
  root: {},
  deliverables: {
    marginTop: theme.spacing(3)
  },
  members: {
    marginTop: theme.spacing(3)
  }
}));

const Overview = observer((props) => {
  const { project, className, rootStore, ...rest } = props;

  const classes = useStyles(1);

  return (
    <Grid
      {...rest}
      className={clsx(classes.root, className)}
      container
      spacing={3}
    >
      <Grid
        item
        lg={8}
        xl={9}
        xs={12}
      >
        <Brief brief={project.description ? project.description : "undefined"} />
        <Deliverables className={classes.deliverables} />
      </Grid>
      <Grid
        item
        lg={4}
        xl={3}
        xs={12}
      >
        <Holder project={project} />

        {project.freelancer ? <Members
          className={classes.members}
          project={project}
          rootStore={rootStore}
        /> : null}
      </Grid>
    </Grid>
  );
});

export default Overview;
