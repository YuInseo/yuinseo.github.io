// Simplified stub — settings modal not needed for web demo
export function TimeTableSettingsModal({ isIgnoredAppsModalOpen, setIsIgnoredAppsModalOpen }: any) {
    if (!isIgnoredAppsModalOpen) return null;
    return (
        <div
            style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={() => setIsIgnoredAppsModalOpen(false)}
        >
            <div style={{ background: 'hsl(220,9%,12%)', border: '1px solid hsl(220,8%,20%)', borderRadius: 12, padding: 24, color: 'hsl(215,15%,87%)', fontSize: 14 }}
                onClick={e => e.stopPropagation()}>
                <p style={{ marginBottom: 16, fontWeight: 600 }}>앱 설정 (데모)</p>
                <p style={{ color: 'hsl(215,10%,48%)', fontSize: 12, marginBottom: 16 }}>실제 앱에서 앱별 추적·필터를 설정할 수 있어요.</p>
                <button
                    onClick={() => setIsIgnoredAppsModalOpen(false)}
                    style={{ background: 'hsl(38,92%,50%)', border: 'none', borderRadius: 6, color: '#000', padding: '6px 16px', cursor: 'pointer', fontWeight: 600 }}
                >
                    닫기
                </button>
            </div>
        </div>
    );
}
