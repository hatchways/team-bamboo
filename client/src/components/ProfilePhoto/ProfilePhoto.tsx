import React, { useState } from 'react';
import { Box, Typography, Input, InputLabel, Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import SettingHeader from '../SettingsHeader/SettingsHeader';
import DeleteIcon from '@mui/icons-material/Delete';
import uploadProfilePhoto from '../../helpers/APICalls/uploadProfilePhoto';
import { useSnackBar } from '../../context/useSnackbarContext';
import deleteProfilePhoto from '../../helpers/APICalls/deleteProfilePhoto';
import { useProfilePhoto } from '../../context/useProfilePhotoContext';

const ProfilePhoto = (): JSX.Element => {
  const [file, setFile] = useState<File>();
  const { photoKey, setPhotoKey, photoPath } = useProfilePhoto();
  const { updateSnackBarMessage } = useSnackBar();

  // console.log(photoPath);

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
    const formData = new FormData();
    formData.append('avatar', e.target.files[0]);
    uploadProfilePhoto(formData).then((data) => {
      if (data.error) {
        console.error(data.error);
        updateSnackBarMessage(data.error);
      }
      setPhotoKey(data.imageKey);
    });
    setFile(undefined);
    updateSnackBarMessage('Photo uploaded!');
  };

  const deletePhoto = () => {
    deleteProfilePhoto(photoKey);
    updateSnackBarMessage('Photo deleted!');
    setPhotoKey('');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <SettingHeader header="Profile Photo" />
      <Avatar alt="profile photo" src={photoPath} sx={{ width: 120, height: 120, marginBottom: 4 }} />
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
        <Button
          variant="text"
          startIcon={<DeleteIcon color="info" />}
          color="secondary"
          sx={{ textTransform: 'none' }}
          onClick={deletePhoto}
        >
          Delete photo
        </Button>
      </Box>
    </Box>
  );
};

export default ProfilePhoto;
