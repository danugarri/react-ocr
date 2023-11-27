import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { ProgressBarProps } from './progressBar.types';

const ProgressBar = ({ message, percentage }: ProgressBarProps) => {
  return (
    <Box sx={{ width: '100%' }}>
      {message}
      <LinearProgress variant="determinate" value={percentage * 100} />
    </Box>
  );
};

export default ProgressBar;
