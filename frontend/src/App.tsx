import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { SignIn, SignUp, SignedIn, SignedOut, UserButton, useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import Modal from './components/Modal';

interface TestCase {
  id: number;
  name: string;
  gherkinScript: string;
  createdAt: string;
}

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
      <Route path="/testcases/new" element={<TestCaseEditorPage />} />
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
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [selectedTestCase, setSelectedTestCase] = useState<TestCase | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const fetchTestCases = async () => {
    try {
      const token = await getToken();
      const response = await axios.get('/api/v1/testcases/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTestCases(response.data);
    } catch (error) {
      console.error('Error fetching test cases:', error);
    }
  };

  useEffect(() => {
    fetchTestCases();
  }, [getToken]);

  const handleView = (testCase: TestCase) => {
    setSelectedTestCase(testCase);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this test case?')) {
      try {
        const token = await getToken();
        await axios.delete(`/api/v1/testcases/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        fetchTestCases(); // Refresh the list
      } catch (error) {
        console.error('Error deleting test case:', error);
      }
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <UserButton />
      <button onClick={() => navigate('/testcases/new')}>Create New Test Case</button>
      <ul>
        {testCases.map(testCase => (
          <li key={testCase.id}>
            {testCase.name}
            <button onClick={() => handleView(testCase)}>View</button>
            <button onClick={() => handleDelete(testCase.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {selectedTestCase && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2>{selectedTestCase.name}</h2>
          <p><strong>Gherkin Script:</strong></p>
          <pre>{selectedTestCase.gherkinScript}</pre>
          <p><strong>Created At:</strong> {new Date(selectedTestCase.createdAt).toLocaleString()}</p>
          <button onClick={() => setIsModalOpen(false)}>Close</button>
        </Modal>
      )}
    </div>
  );
}

function TestCaseEditorPage() {
  const [name, setName] = useState('');
  const [gherkinScript, setGherkinScript] = useState('');
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const token = await getToken();
      await axios.post(
        '/api/v1/testcases/',
        { name, gherkinScript },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating test case:', error);
    }
  };

  return (
    <div>
      <h1>Create New Test Case</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Test Case Name</label>
          <input 
            type="text" 
            id="name" 
            value={name} 
            onChange={e => setName(e.target.value)} 
          />
        </div>
        <div>
          <label htmlFor="gherkinScript">Gherkin Script</label>
          <textarea 
            id="gherkinScript" 
            value={gherkinScript} 
            onChange={e => setGherkinScript(e.target.value)} 
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default App;
