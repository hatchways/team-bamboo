import React, { useState } from 'react';
import { Box, Typography, Input, InputLabel, Button, IconButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import SettingHeader from '../SettingsHeader/SettingsHeader';
import DeleteIcon from '@mui/icons-material/Delete';

const ProfilePhoto = (): JSX.Element => {
  const [file, setFile] = useState<File>();

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <SettingHeader header="Profile Photo" />
      <Avatar
        alt="profile photo"
        src={`https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg`}
        sx={{ width: 120, height: 120, marginBottom: 4 }}
      />
      <Box textAlign="center">
        <Typography variant="body1" sx={{ fontWeight: 600, color: 'secondary.main' }}>
          Be sure to use a photo that <br /> clearly shows your face
        </Typography>
        <form>
          <Input id="button-file" name="avatar" type="file" onChange={handleImgChange} sx={{ opacity: 0 }} />
          <InputLabel htmlFor="button-file">
            <Button component="span" variant="outlined" color="primary" size="large" sx={{ px: 1.5, py: 2, mb: 3 }}>
              Upload a file from your device
            </Button>
          </InputLabel>
        </form>
        <Button variant="text" startIcon={<DeleteIcon color="info" />} color="secondary" sx={{ textTransform: 'none' }}>
          Delete photo
        </Button>
      </Box>
    </Box>
  );
};

export default ProfilePhoto;
