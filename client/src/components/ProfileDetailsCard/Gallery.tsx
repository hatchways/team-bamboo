import { ImageListItem, ImageList } from '@mui/material';

interface PropTypes {
  images: string[];
}

const Gallery = ({ images }: PropTypes) => {
  return (
    <ImageList cols={4} gap={10}>
      {images.map((src, i) => (
        <ImageListItem key={src}>
          <img style={{ borderRadius: '5px' }} alt={`gallery item ${i + 1}`} src={src} />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
export default Gallery;
