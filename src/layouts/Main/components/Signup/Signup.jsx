import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { observer, inject } from 'mobx-react';
import * as dAppInt from '../../../../modules/dAppInt'

const useStyles = makeStyles(theme => ({
  container: {
		maxWidth: 480
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));

const currencies = [
  {
    value: 'USA',
    label: 'USA',
  },
  {
    value: 'Russia',
    label: 'Russia',
  },
  {
    value: 'Ukraine',
    label: 'Ukraine',
  },
  {
    value: 'Other',
    label: 'Other',
  },
];

const Signup = inject('userStore')(observer(({ userStore }) => {
	const classes = useStyles(1);
  const [open, setOpen] = React.useState(true);
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
	const [values, setValues] = React.useState({
    name: '',
    bio: '',
    location: '',
    telegram: ""
	});

  const handleClose = () => {
    console.log("Close")
    setOpen(false);
	};
	
	const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  async function sign(values) {
    console.log(`${values.name} ${values.bio} ${values.location} ${values.telegram}`)
    if (values.name && values.bio && values.location && values.telegram) {
      let data = {
        name: values.name,
        bio: values.bio,
        location: values.location,
        tags: [],
        address: userStore.getUserAddress,
        createTime: Date.now(),
        status: "registered",
        socials: {
          telegram: values.telegram,
          twitter: "",
          website: ""
        }
      }
      console.log(data)
      let signTx = await dAppInt.signUp(data, userStore.getWavesKeeper)
      console.log(signTx)
      handleClose()
    } else {
      
    }
  }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
				aria-labelledby="form-dialog-title"	
      >
        <DialogTitle id="form-dialog-title">{"Welcome. Sign up."}</DialogTitle>
        <DialogContent className={classes.container}>
          <TextField
            required
            id="standard-required"
            label="Name"
            value={values.name}
            onChange={handleChange('name')}
            placeholder="Elon Musk"
            className={classes.textField}
            margin="normal"
					/>
					<TextField
						id="standard-name"
            label="Bio"
            value={values.bio}
            onChange={handleChange('bio')}
						placeholder="Cat. Programmer."
						className={classes.textField}
						margin="normal"
					/>
					
					<TextField
						id="standard-select-currency"
						select
						label="Location"
						className={classes.textField}
						value={values.location}
						onChange={handleChange('location')}
						SelectProps={{
							MenuProps: {
								className: classes.menu,
							},
						}}
						helperText="Please select your location"
						margin="normal"
					>
						{currencies.map(option => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
					<TextField
						id="standard-name"
						label="Telegram"
						className={classes.textField}
						value={values.telegram}
						onChange={handleChange('telegram')}
						margin="normal"
					/>
				</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => {sign(values)}} color="primary">
            Sign Up
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}))

export default Signup;