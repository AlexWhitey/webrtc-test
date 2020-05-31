import { getCalls, saveName, startCall } from 'App/actions';

import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  Paper,
  TextField,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AddIcCall } from '@material-ui/icons';

const useStyles = makeStyles(theme => {
  return {
    mainDiv: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    appBar: {
      height: '48px',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    title: {
      marginLeft: '10px',
    },
    content: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'stretch',
    },
    submit: {
      background: props => {
        if (props.name === "") {
          return theme.palette.text.disabled;
        }

        return theme.palette.primary.main;
      },
      color: props => {
        if (props.name === "") {
          return theme.palette.common.black;
        }
        return `${theme.palette.common.white} !important`
      }
    },
    calls: {
      background: 'red',
      width: '250px',
    },
    streams: {
      background: 'blue',
      flex: 1,
    }
  };
});

const App = () => {
  const initialState = { name: "", open: true };
  const [state, setState] = useState(initialState);
  const classes = useStyles(state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCalls());
  }, []);

  return (
    <React.Fragment>
      <div className={classes.mainDiv}>
        <AppBar className={classes.appBar} position={'relative'}>
          <Typography className={classes.title} variant={'h4'}>
            Testing webRTC
          </Typography>
          <IconButton
            color={'inherit'}
            onClick={() => dispatch(startCall())}
            title={'Start a new call'}
          >
            <AddIcCall />
          </IconButton>
        </AppBar>
        <div className={classes.content}>
          <Paper className={classes.calls}></Paper>
          <Paper className={classes.streams}></Paper>
        </div>
      </div>
      <Dialog disableBackdropClick={true} disableEscapeKeyDown={true} open={state.open}>
        <DialogContent>
          <DialogContentText>
            Choose a name to continue
          </DialogContentText>
          <TextField
            autoFocus={true}
            onChange={event => setState({ name: event.target.value, open: state.open })}
          />
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.submit}
            disabled={state.name === ""}
            onClick={() => {
              dispatch(saveName(state.name));
              setState({ name: state.name, open: false });
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
export default App;