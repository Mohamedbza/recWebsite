// Central asset management for the application
// Import all images here for consistent usage across the app

// Hero Section Images
import heroImage from '/public/images/hero.png';
import heroBackground from '/public/images/hero-background.png';

// Team and Business Images
import businessMeeting from '/public/images/business-meeting-office-recuiteers.jpg';
import youngWomanEmployee from '/public/images/young-woman-office-style-clothes-glasses-holds-tablet-with-documents-employee.jpg';
import teamWorking from '/public/images/team-working.png';

// Logo
import rpLogo from '/public/images/rp-logo-1.png';

// Export all assets for easy importing
export const assets = {
  hero: {
    main: heroImage,
    background: heroBackground,
  },
  team: {
    businessMeeting,
    youngWomanEmployee,
    teamWorking,
  },
  logo: {
    rpLogo,
  },
} as const;

// Individual exports for convenience
export {
  heroImage,
  heroBackground,
  businessMeeting,
  youngWomanEmployee,
  teamWorking,
  rpLogo,
};

export default assets; 