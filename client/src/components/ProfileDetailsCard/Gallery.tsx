import { ImageListItem, ImageList } from '@mui/material';
import { ImgUrlSchema } from '../../interface/Profile';

interface PropTypes {
  images: ImgUrlSchema[];
}

const Gallery = ({ images }: PropTypes) => (
  <ImageList cols={4} gap={10}>
    {images.map(({ filePath, _id }, i) => (
      <ImageListItem key={_id}>
        <img style={{ borderRadius: '5px' }} alt={`gallery item ${i + 1}`} src={filePath} />
      </ImageListItem>
    ))}
  </ImageList>
);
export default Gallery;
