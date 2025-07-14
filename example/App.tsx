import React from 'react';
import { ThemeProvider, Layout, Button, Card, Input, useAnimation } from './src';

function App() {
  const animatedRef = useAnimation();

  return (
    <ThemeProvider config={{ mode: 'auto', animation: 'smooth' }}>
      <Layout
        header={<div className="p-4">My App</div>}
        sidebar={<nav className="p-4">Navigation</nav>}
      >
        <Card glass ref={animatedRef}>
          <h1 className="text-2xl font-bold mb-4">Welcome</h1>
          <Input label="Email" type="email" placeholder="Enter your email" />
          <Button variant="primary" className="mt-4">
            Get Started
          </Button>
        </Card>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
