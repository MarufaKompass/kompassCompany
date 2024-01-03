import React from 'react';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  truncate: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
});

export default function TruncatedSubheader({ subheader, maxChars }) {
  const classes = useStyles();
  const truncatedSubheader = subheader && subheader.length > maxChars ? `${subheader.slice(0, maxChars)}...` : subheader;
  return <Typography className={classes.truncate}>{truncatedSubheader}</Typography>;
}
