import { toast } from 'react-toastify';

export const handleQuickLinkClick = (link) => {
  // Add your navigation logic here
  switch(link.toLowerCase()) {
    case 'about us':
      window.location.href = '/about';
      break;
    case 'services':
      window.location.href = '/services';
      break;
    case 'players':
      window.location.href = '/players';
      break;
    case 'news':
      window.location.href = '/news';
      break;
    case 'career':
      window.location.href = '/career';
      break;
    case 'contact':
      window.location.href = '/contact';
      break;
    default:
      toast.info('Page coming soon!');
  }
};

export const handleSocialClick = (platform) => {
  const socialLinks = {
    facebook: 'https://facebook.com/playermanagement',
    twitter: 'https://twitter.com/playermanagement',
    linkedin: 'https://linkedin.com/company/playermanagement',
    instagram: 'https://instagram.com/playermanagement',
    github: 'https://github.com/playermanagement'
  };

  if (socialLinks[platform]) {
    window.open(socialLinks[platform], '_blank');
  } else {
    toast.info('Social media link coming soon!');
  }
}; 