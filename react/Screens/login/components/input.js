import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

export default function InputWithIcon({icon = null, label = '', error = null, helperText = null, ...rest}) {
  return (
    <Grid container spacing={1} alignItems="flex-end" style={{
      width: '100%',
      marginTop: 15,
    }}>
      {!!icon && <Grid item>
        {icon}
      </Grid>}
      <Grid item style={{flex: 1}}>
        <TextField
          fullWidth
          label={label}
          error={!!error}
          helperText={helperText}
          {...rest}
        />
      </Grid>
    </Grid>
  );
}
