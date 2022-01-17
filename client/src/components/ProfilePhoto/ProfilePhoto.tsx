import {
  Box,
  Typography,
  Input,
  InputLabel,
  Button as MuiButton,
  styled,
  CircularProgress,
  IconButton,
} from '@mui/material';
import { spacing } from '@mui/system';
import Avatar from '@mui/material/Avatar';
import SettingHeader from '../SettingsHeader/SettingsHeader';
import DeleteIcon from '@mui/icons-material/Delete';

const Button = styled(MuiButton)(spacing);

const ProfilePhoto = (): JSX.Element => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <SettingHeader header="Profile Photo" />
      <Avatar
        alt="profile photo"
        src={`https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg`}
        sx={{ width: 120, height: 120, marginBottom: 4 }}
      />
      <Box sx={{ textAlign: 'center' }}>
        <Typography sx={{ fontSize: 15, fontWeight: 600, textAlign: 'center', marginBottom: 3, color: '#afafaf' }}>
          Be sure to use a photo that <br /> clearly shows your face
        </Typography>
        {/* <Button variant="outlined" color="primary">
          Upload a file from your device
        </Button> */}
        <form>
          <Input
            id="icon-button-file"
            name="file"
            type="file"
            inputProps={{ multiple: true }}
            // onChange={handleImgChange}
            sx={{ opacity: 0 }}
          />
          <InputLabel htmlFor="icon-button-file">
            <Button color="primary" variant="outlined" size="large" disableElevation py={1.5} px={2} mb={4}>
              Upload a file from your device
            </Button>
          </InputLabel>
        </form>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <IconButton component="span">
            <DeleteIcon sx={{ marginRight: 1, cursor: 'pointer' }} />
          </IconButton>
          <Typography color="secondary" sx={{ fontSize: 15, fontWeight: 600 }}>
            Delete photo
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePhoto;
