import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const ProgressBar = ({ OCRProgress }: { OCRProgress: number }) => {
  return (
    <Box sx={{ width: '100%' }}>
      Generating Text
      <LinearProgress variant="determinate" value={OCRProgress * 100} />
    </Box>
  );
};

export default ProgressBar;
