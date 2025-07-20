import React, { useState, useEffect, useMemo } from 'react';
import { usePerformanceOptimization } from '../../hooks/usePerformanceOptimization';

export interface PerformanceMonitorProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  showInProduction?: boolean;
  compact?: boolean;
  showGraph?: boolean;
  updateInterval?: number;
  className?: string;
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  position = 'bottom-right',
  showInProduction = false,
  compact = false,
  showGraph = true,
  updateInterval = 1000,
  className = ''
}) => {
  const { metrics, supportsAdvancedFeatures } = usePerformanceOptimization();
  const [fpsHistory, setFpsHistory] = useState<number[]>([]);
  const [memoryHistory, setMemoryHistory] = useState<number[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  // Update history
  useEffect(() => {
    const interval = setInterval(() => {
      setFpsHistory(prev => [...prev.slice(-29), metrics.fps]);
      setMemoryHistory(prev => [...prev.slice(-29), metrics.memory]);
    }, updateInterval);

    return () => clearInterval(interval);
  }, [metrics.fps, metrics.memory, updateInterval]);

  // Position styles
  const positionStyles = useMemo(() => {
    const positions = {
      'top-left': { top: '1rem', left: '1rem' },
      'top-right': { top: '1rem', right: '1rem' },
      'bottom-left': { bottom: '1rem', left: '1rem' },
      'bottom-right': { bottom: '1rem', right: '1rem' }
    };
    return positions[position];
  }, [position]);

  // Hide in production unless explicitly enabled
  if (process.env.NODE_ENV === 'production' && !showInProduction) {
    return null;
  }

  // Performance color coding
  const getPerformanceColor = (value: number, type: 'fps' | 'memory') => {
    if (type === 'fps') {
      if (value >= 55) return '#10b981'; // green
      if (value >= 30) return '#f59e0b'; // amber
      return '#ef4444'; // red
    } else {
      if (value <= 30) return '#10b981'; // green
      if (value <= 60) return '#f59e0b'; // amber
      return '#ef4444'; // red
    }
  };

  // Mini graph component
  const MiniGraph: React.FC<{ data: number[]; max: number; color: string; height?: number }> = ({ 
    data, max, color, height = 30 
  }) => {
    if (!showGraph || data.length < 2) return null;

    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - (value / max) * 100;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg 
        width="60" 
        height={height} 
        style={{ marginLeft: '0.5rem' }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          points={points}
        />
      </svg>
    );
  };

  const containerStyles: React.CSSProperties = {
    position: 'fixed',
    ...positionStyles,
    zIndex: 10000,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    backdropFilter: 'blur(10px)',
    color: 'white',
    padding: compact ? '0.5rem' : '1rem',
    borderRadius: '0.5rem',
    fontFamily: 'monospace',
    fontSize: compact ? '0.7rem' : '0.75rem',
    lineHeight: 1.4,
    minWidth: compact ? '120px' : '200px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.3s ease',
    cursor: compact ? 'pointer' : 'default'
  };

  const MetricRow: React.FC<{ label: string; value: string | number; color?: string; unit?: string }> = ({ 
    label, value, color, unit = '' 
  }) => (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      marginBottom: compact ? '0.2rem' : '0.3rem'
    }}>
      <span style={{ opacity: 0.8 }}>{label}:</span>
      <span style={{ color: color || 'white', fontWeight: 'bold' }}>
        {value}{unit}
      </span>
    </div>
  );

  const performanceModeColor = {
    'economy': '#ef4444',
    'balanced': '#f59e0b', 
    'high': '#10b981'
  }[metrics.performanceMode];

  if (compact && !isExpanded) {
    return (
      <div 
        style={containerStyles}
        className={className}
        onClick={() => setIsExpanded(true)}
        title="Click to expand performance monitor"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: performanceModeColor,
              animation: 'pulse 2s infinite'
            }}
          />
          <span>{metrics.fps}fps</span>
          <span>{metrics.memory}%</span>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyles} className={className}>
      {compact && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '0.5rem'
        }}>
          <span style={{ fontWeight: 'bold' }}>Performance</span>
          <button
            onClick={() => setIsExpanded(false)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: '0',
              fontSize: '1rem'
            }}
          >
            ×
          </button>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
        <MetricRow
          label="FPS"
          value={metrics.fps}
          color={getPerformanceColor(metrics.fps, 'fps')}
        />
        {showGraph && <MiniGraph data={fpsHistory} max={60} color={getPerformanceColor(metrics.fps, 'fps')} />}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
        <MetricRow
          label="Memory"
          value={metrics.memory}
          color={getPerformanceColor(metrics.memory, 'memory')}
          unit="%"
        />
        {showGraph && <MiniGraph data={memoryHistory} max={100} color={getPerformanceColor(metrics.memory, 'memory')} />}
      </div>

      <MetricRow
        label="Mode"
        value={metrics.performanceMode}
        color={performanceModeColor}
      />

      <MetricRow
        label="Connection"
        value={metrics.connection}
        color={metrics.connection === '4g' ? '#10b981' : metrics.connection === '3g' ? '#f59e0b' : '#ef4444'}
      />

      <MetricRow
        label="Device Memory"
        value={metrics.deviceMemory}
        unit="GB"
        color={metrics.deviceMemory >= 8 ? '#10b981' : metrics.deviceMemory >= 4 ? '#f59e0b' : '#ef4444'}
      />

      <MetricRow
        label="CPU Cores"
        value={metrics.hardwareConcurrency}
        color={metrics.hardwareConcurrency >= 8 ? '#10b981' : metrics.hardwareConcurrency >= 4 ? '#f59e0b' : '#ef4444'}
      />

      {!compact && (
        <div style={{ 
          marginTop: '0.5rem', 
          paddingTop: '0.5rem', 
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          fontSize: '0.65rem'
        }}>
          <div style={{ marginBottom: '0.3rem', fontWeight: 'bold', opacity: 0.9 }}>
            Browser Support:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.2rem' }}>
            <span style={{ color: supportsAdvancedFeatures.webp ? '#10b981' : '#ef4444' }}>
              WebP: {supportsAdvancedFeatures.webp ? '✓' : '✗'}
            </span>
            <span style={{ color: supportsAdvancedFeatures.webgl ? '#10b981' : '#ef4444' }}>
              WebGL: {supportsAdvancedFeatures.webgl ? '✓' : '✗'}
            </span>
            <span style={{ color: supportsAdvancedFeatures.intersection ? '#10b981' : '#ef4444' }}>
              IO: {supportsAdvancedFeatures.intersection ? '✓' : '✗'}
            </span>
            <span style={{ color: supportsAdvancedFeatures.resize ? '#10b981' : '#ef4444' }}>
              RO: {supportsAdvancedFeatures.resize ? '✓' : '✗'}
            </span>
            <span style={{ color: supportsAdvancedFeatures.webworker ? '#10b981' : '#ef4444' }}>
              Worker: {supportsAdvancedFeatures.webworker ? '✓' : '✗'}
            </span>
            <span style={{ color: supportsAdvancedFeatures.serviceworker ? '#10b981' : '#ef4444' }}>
              SW: {supportsAdvancedFeatures.serviceworker ? '✓' : '✗'}
            </span>
          </div>
        </div>
      )}

      {/* Performance recommendations */}
      {!compact && metrics.performanceMode === 'economy' && (
        <div style={{
          marginTop: '0.5rem',
          padding: '0.5rem',
          backgroundColor: 'rgba(239, 68, 68, 0.2)',
          borderRadius: '0.25rem',
          fontSize: '0.65rem',
          border: '1px solid rgba(239, 68, 68, 0.3)'
        }}>
          <div style={{ fontWeight: 'bold', color: '#ef4444', marginBottom: '0.2rem' }}>
            Performance Alert
          </div>
          <div style={{ opacity: 0.9 }}>
            Low performance detected. Consider:
            <ul style={{ margin: '0.3rem 0', paddingLeft: '1rem' }}>
              <li>Reducing animation complexity</li>
              <li>Disabling GPU effects</li>
              <li>Using economy mode</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

// Add global pulse animation
const addPulseAnimation = () => {
  if (!document.querySelector('#performance-monitor-keyframes')) {
    const style = document.createElement('style');
    style.id = 'performance-monitor-keyframes';
    style.textContent = `
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
    `;
    document.head.appendChild(style);
  }
};

// Initialize keyframes
addPulseAnimation();

export default PerformanceMonitor;