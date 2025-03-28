"use client";

import React, { useState } from 'react';

import activeTournaments from '@/constants/GameSelection/activeTournaments';
import createTournamentSteps from '@/constants/GameSelection/createTournamentSteps';
import tournamentHistory from '@/constants/GameSelection/tournamentHistory';

import {MainContainer,ContentArea} from '../../style/GameSelection'
import sidebarItems from '@/constants/GameSelection/sidebarItems';
import ActiveTournaments from '@/components/GameSelection/ActiveTournaments';
import TournamentHistory from '@/components/GameSelection/TournamentHistory';
import CreateTournament from '@/components/GameSelection/CreateTournament';
import SideBarItem from '@/components/GameSelection/SideBarItem';
import HeaderComponents from '@/components/GameSelection/Header';
import dayjs from 'dayjs';

export default function TournamentManagement() {
  const [selectedView, setSelectedView] = useState('CREATE');
  const [formData, setFormData] = useState({
    gameType: '',
    rules: '',
    registrationFee: '',
    name: '',
    prizeMoney: '',
    numberOfTeams: '',
    tournamentDate: dayjs(),
    tournamentIcon: null,
    budget: 5000,
    venueBudget:1000,
    equipmentBudget:1000,
    staffBudget:1000,
    registrationDeadline: dayjs(),
    auctionDate: dayjs(),
    
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
        <HeaderComponents selectedView={selectedView} formData={formData}></HeaderComponents>

        {selectedView === 'CREATE' && renderCreateTournament()}
        {selectedView === 'CRICKET' && renderActiveTournaments('CRICKET')}
        {selectedView === 'FOOTBALL' && renderActiveTournaments('FOOTBALL')}
        {selectedView === 'BADMINTON' && renderActiveTournaments('BADMINTON')}
        {selectedView === 'HISTORY' && renderTournamentHistory()}
      </ContentArea>
    </MainContainer>
  );
}