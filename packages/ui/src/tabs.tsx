import * as React from 'react';

interface TabsProps {
  tabs: Array<{ id: string; label: string; content: React.ReactNode }>;
  defaultTab?: string;
}

export function Tabs({ tabs, defaultTab }: TabsProps) {
  const [activeTab, setActiveTab] = React.useState(defaultTab ?? tabs[0]?.id);
  const active = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

  return (
    <div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              borderRadius: 999,
              padding: '0.7rem 1rem',
              border: '1px solid rgba(148, 163, 184, 0.22)',
              background:
                active?.id === tab.id
                  ? 'linear-gradient(135deg, rgba(37, 99, 235, 0.4), rgba(13, 148, 136, 0.35))'
                  : 'rgba(15, 23, 42, 0.56)',
              color: '#f8fafc',
              cursor: 'pointer',
              fontWeight: 700,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{active?.content}</div>
    </div>
  );
}
