"use client";

import React, { useState, useMemo } from 'react';
import {
  Box,
  Grid,
} from '@mui/material';
import { MainContainer } from '@/style/Announcements';
import AnnouncementCard from '@/components/Announcements/AnnouncementCard';
import AnnouncementHeader from '@/components/Announcements/AnnouncementHeader';
import QuickStats from '@/components/Announcements/QuickStats';
import { CreateEditDialog, DeleteDialog } from '@/components/Announcements/AnnouncementDialogs';
import { LoadingState, ErrorState } from '@/components/Common/States';
import mockData from '@/constants/Announcement/mockAccouncements';

import { fetchCurrentTournamentHook } from '@/hook/fetchCurrentTournament';
import { handleSaveAnnouncement } from '@/function/handleSaveAnnouncement';
import { fetchAllCurrentAnnouncementHook } from '@/hook/fetchCurrentAnnouncementHook';
import { handleDeleteAnnouncement,confirmDelete } from '@/function/handleDeleteAnnounceMent';
import { getFilteredAnnouncements } from '@/function/getFilteredAnnouncements';
import { handleEditAnnouncement } from '@/function/handleEditAnnouncement';
import storage from '@/class/storage';
import fetchLatestApprovedTournamentHookDev from '@/hook/dist/fetchLatestApprovedTournamentHook.dev';
import useFetchLatestApprovedTournamentHook from '@/hook/fetchLatestApprovedTournamentHook';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState(mockData);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [announcementToDelete, setAnnouncementToDelete] = useState(null);
  const [filterType, setFilterType] = useState('highPriority');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tournament, setTournament] = useState(null);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const editPermission=storage.get("user").role==="organizer" || storage.get("user").role==="manager";
  if(storage.get("user").role==="player" || storage.get("user").role==="manager"){
    useFetchLatestApprovedTournamentHook(undefined,storage.get("user").role,setTournament)
    }

if(storage.get("user").role==="organizer"){
  fetchCurrentTournamentHook(setTournament)
}

  fetchAllCurrentAnnouncementHook(setAnnouncements,setError,tournament)

  // Sort and memoize announcements
  const sortedAnnouncements = useMemo(() => {
    if (!announcements) return [];
    return [...announcements].sort((a, b) => 
      new Date(b.timestamp) - new Date(a.timestamp)
    );
  }, [announcements]);

  // Memoize filtered announcements
  const filteredAnnouncements = useMemo(() => 
    getFilteredAnnouncements({sortedAnnouncements, filterType}),
    [sortedAnnouncements, filterType]
  );

  // Event handlers
  const handleCreateAnnouncement = () => {
    setOpenDialog(true);
  };

  const handleEdit = (announcement) => {
    setSelectedAnnouncement(announcement);
    setOpenDialog(true);
  };

  return (
    <MainContainer>
      <Box>
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <AnnouncementHeader editPermission={editPermission} onCreateClick={handleCreateAnnouncement} />
          <QuickStats 
            announcements={announcements}
            filterType={filterType}
            onFilterChange={setFilterType}
          />
        </Box>

        {/* Announcements List */}
        <Grid container spacing={3}>
          {isLoading ? (
            <LoadingState message="Loading announcements..." />
          ) : error ? (
            <ErrorState message={error} />
          ) : (
            filteredAnnouncements.map((announcement) => (
              <Grid item xs={12} key={`announcement-${announcement.id}`}>
                <AnnouncementCard
                  announcement={announcement}
                  onDelete={() => handleDeleteAnnouncement(announcement,setAnnouncementToDelete,setDeleteDialogOpen)}
                  onEdit={() => handleEdit(announcement)}
                />
              </Grid>
            ))
          )}
        </Grid>

        {/* Dialogs */}
        <CreateEditDialog
          open={openDialog}
          onClose={() => {
            setOpenDialog(false);
            setSelectedAnnouncement(null);
          }}
          announcement={selectedAnnouncement}
          onSave={(editedAnnouncement) => {
            if (selectedAnnouncement) {
              handleEditAnnouncement(
                { ...editedAnnouncement, id: selectedAnnouncement.id },
                setAnnouncements,
                setOpenDialog,
                tournament
              );
            } else {
              handleSaveAnnouncement(
                editedAnnouncement,
                setAnnouncements,
                setOpenDialog,
                tournament
              );
            }
          }}
        />

        <DeleteDialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={()=>confirmDelete(setAnnouncements,setDeleteDialogOpen,announcementToDelete)}
        />
      </Box>
    </MainContainer>
  );
};

export default Announcements;