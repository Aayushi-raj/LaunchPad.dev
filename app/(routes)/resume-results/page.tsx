import { Suspense } from 'react';
// Update the import path below to the correct relative path based on your project structure
import ResumeResultsPage from '../../_components/ResumeResultsPage';

function ResumeResultsLoading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
        </div>
    );
}

export default async function ResumeResultsPageWrapper() {
    return (
        <Suspense fallback={<ResumeResultsLoading />}>
            <ResumeResultsPage />
        </Suspense>
    );
}