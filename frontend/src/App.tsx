import { Routes, Route } from 'react-router-dom';
import { SignIn, SignUp, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
      <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />
      <Route 
        path="/dashboard" 
        element={
          <>
            <SignedIn>
              <DashboardPage />
            </SignedIn>
            <SignedOut>
              <SignIn routing="path" path="/sign-in" />
            </SignedOut>
          </>
        }
      />
    </Routes>
  );
}

function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>This is a public page.</p>
      <SignedOut>
        <a href="/sign-in">Sign in</a>
      </SignedOut>
      <SignedIn>
        <a href="/dashboard">Go to Dashboard</a>
        <UserButton />
      </SignedIn>
    </div>
  );
}

function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>This is a protected page.</p>
      <UserButton />
    </div>
  );
}

export default App;
