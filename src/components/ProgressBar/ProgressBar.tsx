import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function ProgressBar({ OCRProgress }: { OCRProgress: number }) {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress variant="determinate" value={OCRProgress * 100} />
    </Box>
  );
}
