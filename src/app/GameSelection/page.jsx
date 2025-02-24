"use client";

import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Grid,
  Button,
  Paper,
  Fade,
  Zoom,
  Slide,
  Tooltip,
  Chip,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {
  SportsCricket,
  SportsTennis,
  SportsSoccer,
  AddCircle,
  Save,
  Publish,
  EmojiEvents,
  AttachMoney,
  Rule,
  Schedule,
  Preview,
  Groups,
  CheckCircle,
  Cancel,
  AccessTime,
} from '@mui/icons-material';

import activeTournaments from '@/constants/GameSelection/activeTournaments';
import createTournamentSteps from '@/constants/GameSelection/createTournamentSteps';
import tournamentHistory from '@/constants/GameSelection/tournamentHistory';

import {MainContainer,ContentArea,Sidebar,Header,TournamentCard,StatusChip} from '../../style/GameSelection'
import sidebarItems from '@/constants/GameSelection/sidebarItems';
import ActiveTournaments from '@/components/GameSelection/ActiveTournaments';
import TournamentHistory from '@/components/GameSelection/TournamentHistory';
import CreateTournament from '@/components/GameSelection/CreateTournament';
import SideBarItem from '@/components/GameSelection/SideBarItem';
import HeaderComponents from '@/components/GameSelection/Header';

  export default function TournamentManagement() {
    const [selectedView, setSelectedView] = useState('CREATE');
    const [formData, setFormData] = useState({
      gameType: '',
      rules: '',
      registrationFee: '',
      prizeMoney: '',
      otherExpenses: '',
      numberOfTeams: '',
      startDate: '',
    });
  

    const renderActiveTournaments = (sportType) => (
<ActiveTournaments activeTournaments={activeTournaments} sportType={sportType}></ActiveTournaments>
    );
  
    const renderTournamentHistory = () => (
    <TournamentHistory tournamentHistory={tournamentHistory}></TournamentHistory>
    );
  
    const renderCreateTournament = () => (
    <CreateTournament createTournamentSteps={createTournamentSteps} formData={formData} setFormData={setFormData}></CreateTournament>
    );
  
    return (
      <MainContainer>
     <SideBarItem sidebarItems={sidebarItems} selectedView={selectedView} setSelectedView={setSelectedView}></SideBarItem>
  
        <ContentArea>
       <HeaderComponents selectedView={selectedView}></HeaderComponents>
  
          {selectedView === 'CREATE' && renderCreateTournament()}
          {selectedView === 'CRICKET' && renderActiveTournaments('CRICKET')}
          {selectedView === 'FOOTBALL' && renderActiveTournaments('FOOTBALL')}
          {selectedView === 'BADMINTON' && renderActiveTournaments('BADMINTON')}
          {selectedView === 'HISTORY' && renderTournamentHistory()}
        </ContentArea>
      </MainContainer>
    );
  }