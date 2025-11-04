
import { AuthProvider } from './context/AuthContext';
import AppRouter from './router/AppRouter';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#0D1117] text-white antialiased">
        <AppRouter />
      </div>
    </AuthProvider>
  );
}

export default App;
