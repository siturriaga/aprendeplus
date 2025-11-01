import { Route, Switch } from 'wouter';
import { Dashboard } from './pages/Dashboard';
import { Roster } from './pages/Roster';
import { Standards } from './pages/Standards';
import { Assignments } from './pages/Assignments';
import { Groups } from './pages/Groups';
import { Settings } from './pages/Settings';
import { Tracker } from './pages/Tracker';
import { Header } from './components/core/Header';
import { Sidebar } from './components/core/Sidebar';
import { ProtectedRoute } from './components/core/ProtectedRoute';
import { SignIn } from './pages/SignIn';
import { useFirebase } from './providers/FirebaseProvider';

const routes = [
  { path: '/', component: Dashboard },
  { path: '/roster', component: Roster },
  { path: '/standards', component: Standards },
  { path: '/assignments', component: Assignments },
  { path: '/tracker', component: Tracker },
  { path: '/groups', component: Groups },
  { path: '/settings', component: Settings }
];

export default function App() {
  const { user } = useFirebase();

  if (!user) {
    return <SignIn />;
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-8">
          <Switch>
            {routes.map(({ path, component: Component }) => (
              <Route key={path} path={path}>
                <ProtectedRoute>
                  <Component />
                </ProtectedRoute>
              </Route>
            ))}
          </Switch>
        </main>
      </div>
    </div>
  );
}
