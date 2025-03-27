export const getFilteredAnnouncements = ({sortedAnnouncements, filterType}) => {
  if (!sortedAnnouncements) return [];
  
  return sortedAnnouncements.filter(announcement => {
    switch(filterType) {
      case 'highPriority':
        return announcement.priority === 'high';
      case 'mediumPriority':
        return announcement.priority === 'medium';
      case 'lowPriority':
        return announcement.priority === 'low';
      case 'scheduled':
        return announcement.type === 'schedule';
      case 'general':
        return announcement.type === 'general';
      case 'results':
        return announcement.type === 'results';
      default:
        return true;
    }
  });
};