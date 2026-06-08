import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="login-page">
      <section className="login-panel">
        <div>
          <p className="eyebrow">Sabprime Workboard</p>
          <h1>Login</h1>
          <p className="muted">Prototype access for project task updates, source tracking, and assignment packages.</p>
        </div>

        <form className="login-form">
          <label>
            Email or username
            <input name="email" placeholder="admin@sabprime" />
          </label>
          <label>
            Password
            <input name="password" placeholder="Prototype only" type="password" />
          </label>
          <Link className="button" href="/kanban">
            Continue to Kanban
          </Link>
        </form>

        <div className="login-links">
          <Link href="/dashboard">Project dashboard</Link>
          <Link href="/company">Company dashboard</Link>
        </div>
      </section>
    </main>
  );
}
