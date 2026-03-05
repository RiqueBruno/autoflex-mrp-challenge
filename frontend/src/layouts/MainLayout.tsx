import { Outlet } from "react-router-dom";

export function DefaultLayout() {
  return (
    <div className="layout">
      <div>
        <h1>Header</h1>
      </div>
      <div>
        <h2>Sidebar</h2>
      </div>
      <main>
        <Outlet />
      </main>
      <div>
        <h3>Footer</h3>
      </div>
    </div>
  );
}
