import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, IconButton } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Sidebar } from '@/style/GameSelection';

const SideBarItem = ({ sidebarItems, selectedView, setSelectedView }) => {
  return (
    <Sidebar>
      {sidebarItems.map((item, index) => (
        <Tooltip key={index} title={item.label} placement="right">
          <IconButton
            onClick={() => setSelectedView(item.view)}
            sx={{ 
              color: selectedView === item.view ? '#06b6d4' : alpha('#fff', 0.7),
              '&:hover': { 
                color: '#06b6d4',
                transform: 'scale(1.1)',
                bgcolor: alpha('#fff', 0.1),
              },
              transition: 'all 0.3s ease',
            }}
          >
            {item.icon}
          </IconButton>
        </Tooltip>
      ))}
    </Sidebar>
  );
};

SideBarItem.propTypes = {
  sidebarItems: PropTypes.array.isRequired,
  selectedView: PropTypes.string.isRequired,
  setSelectedView: PropTypes.func.isRequired,
};

export default SideBarItem;
