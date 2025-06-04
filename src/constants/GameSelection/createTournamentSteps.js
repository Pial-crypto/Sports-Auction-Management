

import React from 'react';
import {
  SportsCricket,
  SportsTennis,
  SportsSoccer,
  AttachMoney,
  Rule,
  Groups,
} from '@mui/icons-material';
const createTournamentSteps = [
    {
      id: 1,
      name: "Select Game Type",
      icon: <SportsCricket sx={{ fontSize: 40 }} />,
      component: "GameTypeSelector",
      image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e",
      options: [
        { value: "cricket", label: "Cricket", icon: <SportsCricket /> },
        { value: "football", label: "Football", icon: <SportsSoccer /> },
        // { value: "badminton", label: "Badminton", icon: <SportsTennis /> }
      ]
    },
    {
      id: 2,
      name: "Basic info",
      icon: <Rule sx={{ fontSize: 40 }} />,
      component: "RulesEditor",
      image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20",
      templates: [
        "Standard League Rules",
        "Knockout Tournament Rules",
        "Custom Rules"
      ]
    },
    {
      id: 3,
      name: "Budget Setup",
      icon: <AttachMoney sx={{ fontSize: 40 }} />,
      component: "BudgetPlanner",
      image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e",
      ranges: {
        registration: { min: 10, max: 1000 },
        prize: { min: 100, max: 10000 },
        expenses: { min: 0, max: 5000 }
      }
    },
    {
      id: 4,
      name: "Team Setup",
      icon: <Groups sx={{ fontSize: 40 }} />,
      component: "TeamSetup",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692", // Image of a team working together
      teamOptions: Array.from({ length: 32 }, (_, i) => i + 1)
    }
  ];

  export default createTournamentSteps