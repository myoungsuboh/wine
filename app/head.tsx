import './globals.css';

export default function Head({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <div className="layout">
      <header className="header">
        <h1>내 앱</h1>
        {/* 네비게이션이나 다른 전역 요소들 */}
      </header>
      <main className="main-content">{children}</main>
      <footer className="footer">{/* 푸터 내용 */}</footer>
    </div>
  );
}
