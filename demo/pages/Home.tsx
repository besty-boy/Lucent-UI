import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeShowcase } from '../ThemeShowcase';

export function Home() {
  const navigate = useNavigate();
  
  const navigateToDocumentation = () => {
    navigate('/docs');
  };

  return <ThemeShowcase onNavigateToDocumentation={navigateToDocumentation} />;
}