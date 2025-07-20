import React, { useState, useEffect } from 'react';
import { runWCAGAudit } from '../utils/wcagCompliance';
import { getContrastRatio } from '../utils/colorContrast';
import { analyzeTextReadability } from '../hooks/useTypography';

interface AccessibilityIssue {
  type: 'contrast' | 'focus' | 'aria' | 'keyboard' | 'semantic';
  severity: 'error' | 'warning' | 'info';
  element: string;
  message: string;
  recommendation: string;
}

interface AccessibilityTesterProps {
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  theme?: 'dark' | 'light';
  minimized?: boolean;
}

export const AccessibilityTester: React.FC<AccessibilityTesterProps> = ({
  position = 'bottom-left',
  theme = 'dark',
  minimized = true
}) => {
  const [isOpen, setIsOpen] = useState(!minimized);
  const [auditResults, setAuditResults] = useState<{
    issues: AccessibilityIssue[];
    summary: { total: number; errors: number; warnings: number; info: number };
  }>({ issues: [], summary: { total: 0, errors: 0, warnings: 0, info: 0 } });
  
  const [selectedTab, setSelectedTab] = useState<'overview' | 'issues' | 'contrast' | 'readability'>('overview');
  const [contrastTest, setContrastTest] = useState({ foreground: '#000000', background: '#ffffff' });
  const [readabilityTest, setReadabilityTest] = useState('This is a sample text for readability analysis. You can replace this with any text you want to test.');

  // Run accessibility audit
  const runAudit = () => {
    const results = runWCAGAudit();
    setAuditResults(results);
  };

  // Auto-run audit on mount and periodically
  useEffect(() => {
    runAudit();
    const interval = setInterval(runAudit, 5000); // Check every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Position classes
  const positionClasses = {
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4'
  };

  // Theme classes
  const themeClasses = theme === 'dark' 
    ? 'bg-gray-900 border-gray-700 text-gray-100'
    : 'bg-white border-gray-300 text-gray-900';

  const contrastRatio = getContrastRatio(contrastTest.foreground, contrastTest.background);
  const readabilityAnalysis = analyzeTextReadability(readabilityTest);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed ${positionClasses[position]} z-50 p-3 rounded-full ${themeClasses} border shadow-lg hover:shadow-xl transition-shadow`}
        aria-label="Open Accessibility Tester"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
        </svg>
      </button>
    );
  }

  return (
    <div className={`fixed ${positionClasses[position]} z-50 w-96 h-96 ${themeClasses} border rounded-lg shadow-2xl flex flex-col overflow-hidden`}>
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-current border-opacity-20">
        <h3 className="font-semibold text-sm">Accessibility Tester</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={runAudit}
            className="text-xs px-2 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            Refresh
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="text-xs hover:opacity-70"
            aria-label="Close Accessibility Tester"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-current border-opacity-20">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'issues', label: `Issues (${auditResults.summary.total})` },
          { id: 'contrast', label: 'Contrast' },
          { id: 'readability', label: 'Text' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id as any)}
            className={`flex-1 px-2 py-1 text-xs ${
              selectedTab === tab.id 
                ? 'bg-blue-500 text-white' 
                : 'hover:bg-current hover:bg-opacity-10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-3">
        {selectedTab === 'overview' && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded bg-red-500 bg-opacity-10">
                <div className="font-semibold text-red-500">{auditResults.summary.errors}</div>
                <div>Errors</div>
              </div>
              <div className="p-2 rounded bg-yellow-500 bg-opacity-10">
                <div className="font-semibold text-yellow-500">{auditResults.summary.warnings}</div>
                <div>Warnings</div>
              </div>
            </div>
            
            <div className="text-xs space-y-1">
              <h4 className="font-semibold">Quick Checks:</h4>
              <div className="flex justify-between">
                <span>Focus indicators</span>
                <span className={auditResults.issues.some(i => i.type === 'focus') ? 'text-red-500' : 'text-green-500'}>
                  {auditResults.issues.some(i => i.type === 'focus') ? '✗' : '✓'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>ARIA labels</span>
                <span className={auditResults.issues.some(i => i.type === 'aria') ? 'text-red-500' : 'text-green-500'}>
                  {auditResults.issues.some(i => i.type === 'aria') ? '✗' : '✓'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Semantic HTML</span>
                <span className={auditResults.issues.some(i => i.type === 'semantic') ? 'text-red-500' : 'text-green-500'}>
                  {auditResults.issues.some(i => i.type === 'semantic') ? '✗' : '✓'}
                </span>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'issues' && (
          <div className="space-y-2">
            {auditResults.issues.length === 0 ? (
              <div className="text-green-500 text-xs text-center py-4">
                🎉 No accessibility issues found!
              </div>
            ) : (
              auditResults.issues.slice(0, 10).map((issue, index) => (
                <div key={index} className={`p-2 rounded text-xs border-l-2 ${
                  issue.severity === 'error' ? 'border-red-500 bg-red-500 bg-opacity-10' :
                  issue.severity === 'warning' ? 'border-yellow-500 bg-yellow-500 bg-opacity-10' :
                  'border-blue-500 bg-blue-500 bg-opacity-10'
                }`}>
                  <div className="font-semibold">{issue.type.toUpperCase()}</div>
                  <div className="opacity-75">{issue.element}</div>
                  <div className="mt-1">{issue.message}</div>
                </div>
              ))
            )}
          </div>
        )}

        {selectedTab === 'contrast' && (
          <div className="space-y-3">
            <div className="text-xs space-y-2">
              <div>
                <label className="block font-semibold mb-1">Foreground:</label>
                <input
                  type="color"
                  value={contrastTest.foreground}
                  onChange={(e) => setContrastTest(prev => ({ ...prev, foreground: e.target.value }))}
                  className="w-full h-8 rounded"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Background:</label>
                <input
                  type="color"
                  value={contrastTest.background}
                  onChange={(e) => setContrastTest(prev => ({ ...prev, background: e.target.value }))}
                  className="w-full h-8 rounded"
                />
              </div>
              
              <div className="p-2 rounded border" style={{ color: contrastTest.foreground, backgroundColor: contrastTest.background }}>
                Sample text with current colors
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Contrast Ratio:</span>
                  <span className="font-semibold">{contrastRatio.toFixed(2)}:1</span>
                </div>
                <div className="flex justify-between">
                  <span>WCAG AA:</span>
                  <span className={contrastRatio >= 4.5 ? 'text-green-500' : 'text-red-500'}>
                    {contrastRatio >= 4.5 ? '✓ Pass' : '✗ Fail'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>WCAG AAA:</span>
                  <span className={contrastRatio >= 7 ? 'text-green-500' : 'text-red-500'}>
                    {contrastRatio >= 7 ? '✓ Pass' : '✗ Fail'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'readability' && (
          <div className="space-y-3">
            <div className="text-xs">
              <textarea
                value={readabilityTest}
                onChange={(e) => setReadabilityTest(e.target.value)}
                className="w-full h-20 p-2 rounded border text-xs"
                placeholder="Enter text to analyze readability..."
              />
              
              <div className="mt-2 space-y-1">
                <div className="flex justify-between">
                  <span>Readability Score:</span>
                  <span className="font-semibold">{readabilityAnalysis.score}</span>
                </div>
                <div className="flex justify-between">
                  <span>Level:</span>
                  <span className={`font-semibold ${
                    readabilityAnalysis.level === 'excellent' ? 'text-green-500' :
                    readabilityAnalysis.level === 'good' ? 'text-blue-500' :
                    readabilityAnalysis.level === 'fair' ? 'text-yellow-500' : 'text-red-500'
                  }`}>
                    {readabilityAnalysis.level}
                  </span>
                </div>
                
                {readabilityAnalysis.recommendations.length > 0 && (
                  <div className="mt-2">
                    <div className="font-semibold mb-1">Recommendations:</div>
                    {readabilityAnalysis.recommendations.map((rec, i) => (
                      <div key={i} className="text-xs opacity-75">• {rec}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Development-only wrapper
export const AccessibilityDevTools: React.FC<AccessibilityTesterProps> = (props) => {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  
  return <AccessibilityTester {...props} />;
};