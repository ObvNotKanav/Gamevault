import React from 'react';
import { GameVaultProvider, useGameVault } from './context/GameVaultContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ComparisonBar } from './components/ComparisonBar';
import { ApiSettingsModal } from './components/ApiSettingsModal';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { GameDetailPage } from './pages/GameDetailPage';
import { QuizPage } from './pages/QuizPage';
import { QuizResultsPage } from './pages/QuizResultsPage';
import { ForYouPage } from './pages/ForYouPage';
import { LibraryPage } from './pages/LibraryPage';
import { WishlistPage } from './pages/WishlistPage';
import { ComparePage } from './pages/ComparePage';
import { CheckCircle2 } from 'lucide-react';

const GameVaultAppContent: React.FC = () => {
  const { route, toastMessage } = useGameVault();

  const renderActivePage = () => {
    switch (route) {
      case 'home':
        return <HomePage />;
      case 'explore':
        return <ExplorePage />;
      case 'game-detail':
        return <GameDetailPage />;
      case 'quiz':
        return <QuizPage />;
      case 'quiz-results':
        return <QuizResultsPage />;
      case 'for-you':
        return <ForYouPage />;
      case 'library':
        return <LibraryPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'compare':
        return <ComparePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f17] text-slate-100 font-sans selection:bg-[#10b981]/30 selection:text-emerald-200">
      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 animate-in fade-in slide-in-from-top-3 duration-200 pointer-events-none">
          <div className="flex items-center gap-2.5 rounded-md border border-[#10b981]/60 bg-[#131926]/95 px-4 py-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.6)] backdrop-blur-md">
            <CheckCircle2 className="h-4 w-4 text-[#10b981] shrink-0" />
            <span className="text-xs font-semibold text-slate-100">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Main Top Navigation */}
      <Navbar />

      {/* Dynamic View Canvas */}
      <main className="flex-1">
        {renderActivePage()}
      </main>

      {/* Floating Bottom Comparison Bar (shows when games are in comparison tray) */}
      <ComparisonBar />

      {/* RAWG / Curated Vault API Settings Modal */}
      <ApiSettingsModal />

      {/* Site Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <GameVaultProvider>
      <GameVaultAppContent />
    </GameVaultProvider>
  );
}
