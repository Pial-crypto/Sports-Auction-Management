



import React from 'react';
import {
  SportsCricket,
  SportsTennis,
  SportsSoccer,
  AddCircle,
  EmojiEvents,
} from '@mui/icons-material';



const sidebarItems = [
    { icon: <SportsCricket />, label: 'Cricket', view: 'CRICKET' },
    { icon: <SportsSoccer />, label: 'Football', view: 'FOOTBALL' },
    { icon: <SportsTennis />, label: 'Badminton', view: 'BADMINTON' },
    { icon: <AddCircle />, label: 'Create Tournament', view: 'CREATE' },
    { icon: <EmojiEvents />, label: 'Tournament History', view: 'HISTORY' },
  ];


  export default sidebarItems